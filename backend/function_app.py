import azure.functions as func
import logging
import os
import numpy as np
import json
import pandas as pd
import base64
from io import StringIO
from openai import AzureOpenAI
from dotenv import load_dotenv
from requests_toolbelt.multipart import decoder  # Add this import

load_dotenv()  # loads .env

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="ConvertCsv")

@app.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")


def ConvertCsv(req: func.HttpRequest, msg: func.Out[func.QueueMessage]) -> func.HttpResponse:
    logging.info("Converting CSV and invoking Azure OpenAI via HTTP trigger.")
    try:
        # Check Content-Type header
        content_type = req.headers.get("Content-Type", "")
        if "multipart/form-data" in content_type:
            # Parse the multipart data
            multipart_data = decoder.MultipartDecoder(req.get_body(), content_type)
            csv_content = None
            for part in multipart_data.parts:
                if b'name="file"' in part.headers.get(b"Content-Disposition", b""):
                    csv_content = part.text
                    break
            if csv_content is None:
                raise ValueError("No file part found in the request.")
        else:
            # If not multipart, assume raw CSV in body
            csv_content = req.get_body().decode('utf-8')

        # Read CSV data
        data = pd.read_csv(StringIO(csv_content))
        data.columns = data.columns.str.lower().str.replace(' ', '_')

        # Convert to JSON and save
        data = data.replace({np.nan: None})
        structured_data = data.to_dict(orient='records')
        
        with open('structured_banking_data.json', 'w') as json_file:
            json.dump(structured_data, json_file, indent=4)

        # Summarize reasoning
        summary = data.groupby('type')['amount'].sum().to_dict()
        with open('reasoning_result.json', 'w') as json_file:
            json.dump(summary, json_file, indent=4)

        endpoint = os.getenv("ENDPOINT_URL")
        deployment = os.getenv("DEPLOYMENT_NAME")
        subscription_key = os.getenv("AZURE_OPENAI_API_KEY")
        
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=subscription_key,
            api_version="2024-05-01-preview",
        )

        # Build and send the prompt
        chat_prompt = [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You are an AI assistant and your name is BankMate.  You help customers analyze their spending by reviewing their banking transactions."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"What does my spending say about me? Here is my data: {structured_data}.  Review the data and provide a detailed analysis of my spending habits, including any patterns or trends you observe.  Also, suggest any potential areas for improvement or changes I could make to my spending habits.  Begin your response with 'Hey, it's BankMate here!  Thanks for trusting me with your banking data :)' and end with 'I hope this helps you understand your spending better!'"
                    }
                ]
            }
        ]

        completion = client.chat.completions.create(
            model=deployment,
            messages=chat_prompt,
            max_tokens=1500,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False
        )

        # Save completion to Markdown
        with open('transactions_analysis.md', 'w', encoding='utf-8') as md_file:
            md_file.write("# Your Analysis: \n\n")
            md_file.write(completion.choices[0].message.content)

        # Check for a "name" parameter and set to queue if present
        name = req.params.get('name')
        if not name:
            try:
                req_body = req.get_json()
            except ValueError:
                req_body = {}
            name = req_body.get('name')

        if name:
            msg.set(name)

        response_data = {
            "mdContent": completion.choices[0].message.content,
            "jsonContent": structured_data
        }
        return func.HttpResponse(
            json.dumps(response_data),
            status_code=200,
            mimetype="application/json"
        )
    except Exception as e:
        logging.error(f"Error during conversion or OpenAI call: {str(e)}")
        return func.HttpResponse(
            "An error occurred in the function.",
            status_code=500
        )