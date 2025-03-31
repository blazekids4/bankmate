# BankMate

## Summary

BankMate is a full-stack application that combines a Python-based backend with a Next.js frontend to deliver a seamless experience for analyzing your personal banking data.  The application is hosted on Azure through Azure Function Apps (backend) and Azure Web Apps (frontend).  The LLM service utilized in Azure OpenAI.

The purpose of this app is to demonstrate the ability for banking institutions to provide their customers with the ability to engage in a natural language conversation on their banking data.  Below is an example output from the LLM on banking transactions that includes:

   1. Detailed Analysis of Your Spending Habit
   2. Spending Trends
   3. Suggestions for Improvement
   4. Key Takeaways

## Your Analysis

   Hey, it's BankMate here! Thanks for trusting me with your banking data :) Let's dive into your spending habits and see what insights we can uncover.

### Detailed Analysis of Your Spending Habits

#### 1. **Subscription and Entertainment Spending**

- You're subscribed to multiple services, including:
- **Streaming Platforms**: Hulu (-$100.79), Netflix (-$26.24), Prime Video (-$5.99, -$9.99, -$2.99), Amazon Kids+ (-$5.99).
- **Digital Tools**: OpenAI ChatGPT (-$20), Runway Pro Plan (-$35), Vercel (-$30 + $5), Vimeo (-$300), Supabase (-$25), Google (-$28.80).
- These subscriptions are consistent and likely represent ongoing costs for entertainment, digital tools, and development resources.
- **Pattern**: Your subscription spending is diversified across entertainment and productivity tools, suggesting a balanced approach to leisure and work-related activities.
- **Improvement Opportunity**: Consider reviewing subscriptions to identify any underutilized services. For example, are you using all features of Prime Video Channels or tools like Vimeo and Runway Pro Plan? Canceling unused subscriptions could free up funds.

#### 2. **Food and Delivery Spending**

- **Uber Eats** transactions are frequent and significant:
- Single purchases range from small amounts (-$8.68) to larger ones (-$97.11, -$58.63, -$72.64), indicating reliance on food delivery.
- Other food-related spending includes Chipotle (-$17.61) and Nyx Canteen (-$2.85, -$2.10, -$2.35).
- **Pattern**: Food delivery seems to be a major recurring expense. The multiple Uber Eats transactions indicate you frequently opt for convenience.
- **Improvement Opportunity**: Cooking at home or meal prepping could reduce costs significantly. Consider limiting food delivery to special occasions or budgeting a fixed amount for dining out.

#### 3. **Retail and Online Shopping**

- **Amazon** spending is substantial:
- Transactions include Amazon Marketplace (-$40.94), Amazon Prime Payments (-$1.00, -$2.99), and Amazon.com (-$238.13).
- Other shopping-related expenses include Walgreens (-$27.39).
- **Pattern**: Amazon is a preferred shopping platform, which may be convenient but can lead to impulse purchases.
- **Improvement Opportunity**: Implement a "cooling-off period" for non-essential purchases. Wait 24 hours before completing a transaction to determine whether it's truly necessary.

#### 4. **Recurring Bills and Utilities**

- You've allocated funds for utilities such as Comcast (-$90.30) and tuition for high school (-$700).
- **Pattern**: These are essential, fixed expenses that are predictable.
- **Improvement Opportunity**: No immediate concerns here, but you could explore if there are ways to lower costs (e.g., negotiating with Comcast or exploring tuition discounts).

#### 5. **Transportation**

- There’s a charge from Shell Service Station for gas (-$45.20), indicating vehicle expenses.
- **Pattern**: Transportation costs are relatively low and seem infrequent.
- **Improvement Opportunity**: If you’re not using public transportation, consider ride-sharing or carpooling to further reduce costs.

#### 6. **Large One-Time Payments**

- Rent (-$3,400 via Zelle) is a significant monthly expense.
- **Pattern**: Rent constitutes a large portion of your spending, which is typical for most households.
- **Improvement Opportunity**: Explore ways to save on rent (e.g., sharing living space or renegotiating lease terms).

### Spending Trends

   1. **High Frequency of Small Transactions**: Many small purchases on platforms like Uber Eats, Apple.com, and Nyx Canteen add up over time.
   2. **Digital Services and Tools**: A notable portion of spending goes toward subscriptions and digital tools, indicating you value convenience and productivity.
   3. **Amazon Dominance**: Amazon is a key player in your shopping habits, suggesting a preference for online shopping.
   4. **Food Delivery Over Dining Out**: Uber Eats dominates food-related transactions, emphasizing convenience over dining out.

### Suggestions for Improvement

   1. **Set Budget Limits**: Allocate monthly budgets for specific categories like food delivery, subscriptions, and shopping. This can help you track and control spending.
   2. **Audit Subscriptions**: Review all recurring subscriptions and cancel the ones you rarely use or can live without.
   3. **Reduce Food Delivery Costs**: Try meal prepping or cooking at home to reduce reliance on Uber Eats.
   4. **Shop Mindfully**: Avoid impulse purchases on Amazon by adding items to your cart and revisiting them later.
   5. **Track Savings Goals**: Set aside a percentage of your income each month for savings. Automating transfers to a savings account can help you build financial resilience.

### Key Takeaways

- Your spending reflects a preference for convenience (Uber Eats, Amazon), entertainment (streaming services), and productivity tools (OpenAI, Vercel).
- Food delivery and subscriptions are areas where costs could be optimized.
- Rent is your largest expense, which is typical but leaves room for exploring cost-saving options in other areas.

   I hope this helps you understand your spending better! Let me know if you'd like assistance with setting up a budget or exploring cost-saving strategies further. 😊

## Project Structure

- **backend/**: Contains the Python function app and its configuration files.
  - `function_app.py`: The core application logic for backend processing.
  - `host.json` & `local.settings.json`: Configuration files for the function app.
  - **data/**: Contains raw data files like `banking_data.csv` used by the backend.

- **frontend/**: Contains the Next.js frontend application.
  - Contains configuration files such as `next.config.ts`, `package.json`, `tsconfig.json`, etc.
  - **app/**: Main app source code including pages, layouts, and assets.
  - **public/**: Static files such as images and icons.
  - **.next/**: Build output folder for the Next.js project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Python](https://www.python.org/) (v3.8 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Running the Backend

1. Navigate to the `backend` folder:

   ```sh
   cd backend
   ```

2. Create and activate a virtual environment (optional but recommended):

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use 'venv\Scripts\activate'
   ```

3. Install required packages:

   ```sh
   pip install -r requirements.txt
   ```

4. Run the application:

   ```sh
   python function_app.py
   ```

### Running the Frontend

1. Navigate to the `frontend` folder:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

### Backend

Deploy the Python function app to your preferred cloud provider (e.g., Azure Functions). Ensure the configurations in `host.json` and `local.settings.json` are updated to reflect your production environment.

### Frontend

Build the Next.js app for production:

```sh
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.

## License

This project is licensed under the MIT License.
