# README


## Front End CORS

func start --cors http://localhost:3000


## func commands

Azure Functions Core Tools
Core Tools Version:       4.0.6821 Commit hash: N/A +c09a2033faa7ecf51b3773308283af0ca9a99f83 (64-bit)
Function Runtime Version: 4.1036.1.23224

Usage: func [context] [context] <action> [-/--options]

Contexts:
azure               Commands to log in to Azure and manage resources
azurecontainerapps  Commands for working with Container Service and Azure Functions
durable             Commands for working with Durable Functions
extensions          Commands for installing extensions
function            Commands for creating and running functions locally 
host                Commands for running the Functions host locally     
kubernetes          Commands for working with Kubernetes and Azure Functions
settings            Commands for managing environment settings for the local Functions host
templates           Commands for listing available function templates

Actions:
start   Launches the functions runtime host
    --port [-p]             Local port to listen on. Default: 7071
    --cors                  A comma separated list of CORS origins with 
                             no spaces. Example: https://functions.azur 
                            e.com,https://functions-staging.azure.com   
    --cors-credentials      Allow cross-origin authenticated requests ( 
                            i.e. cookies and the Authentication header) 
    --timeout [-t]          Timeout for the functions host to start in  
                            seconds. Default: 20 seconds.
    --useHttps              Bind to https://localhost:{port} rather tha 
                            n http://localhost:{port}. By default it cr 
                            eates and trusts a certificate.
    --cert                  for use with --useHttps. The path to a pfx  
                            file that contains a private key
    --password              to use with --cert. Either the password, or 
                             a file that contains the password for the  
                            pfx file
    --language-worker       Arguments to configure the language worker. 
    --no-build              Do not build the current project before run 
                            ning. For dotnet projects only. Default is  
                            set to false.
    --enableAuth            Enable full authentication handling pipelin
                            e.
    --functions                                         A space separated list of functions to load.
    --verbose               When false, hides system logs other than wa 
                            rnings and errors.
    --dotnet-isolated-debug When specified, set to true, pauses the .NE 
                            T Worker process until a debugger is attach 
                            ed.
    --enable-json-output    Signals to Core Tools and other components  
                            that JSON line output console logs, when ap 
                            plicable, should be emitted.
    --json-output-file      If provided, a path to the file that will b 
                            e used to write the output when using --ena 
                            ble-json-output.
    --runtime               If provided, determines which version of th 
                            e host to start. Allowed values are 'inproc 
                            6', 'inproc8', and 'default' (which runs th 
                            e out-of-process host).

new     Create a new function from a template. Aliases: new, create     
    --language [-l]  Template programming language, such as C#, F#, Jav
                     aScript, etc.
    --template [-t]  Template name
    --name [-n]      Function name
    --file [-f]      File Name
    --authlevel [-a] Authorization level is applicable to templates tha 
                     t use Http trigger, Allowed values: [function, ano
                     nymous, admin]. Authorization level is not enforce 
                     d when running functions from core tools
    --csx            use old style csx dotnet functions

init    Create a new Function App in the current folder. Initializes git repo.
    --source-control       Run git init. Default is false.
    --worker-runtime       Runtime framework for the functions. Options 
                            are: dotnet-isolated, dotnet, node, python, 
                            powershell, custom
    --force                Force initializing
    --docker               Create a Dockerfile based on the selected wo 
                           rker runtime
    --docker-only          Adds a Dockerfile to an existing function ap
                           p project. Will prompt for worker-runtime if 
                            not specified or set in local.settings.json 
    --csx                  use csx dotnet functions
    --language             Initialize a language specific project. Curr 
                           ently supported when --worker-runtime set to 
                            node. Options are - "typescript" and "javas 
                           cript"
    --target-framework     Initialize a project with the given target f 
                           ramework moniker. Currently supported only w 
                           hen --worker-runtime set to dotnet-isolated  
                           or dotnet. Options are - net9.0, net8.0, net 
                           7.0, net6.0, net48
    --managed-dependencies Installs managed dependencies. Currently, on 
                           ly the PowerShell worker runtime supports th 
                           is functionality.
    --model [-m]           Selects the programming model for the functi 
                           on app. Note this flag is now only applicabl 
                           e to Python and JavaScript/TypeScript. Optio 
                           ns are V1 and V2 for Python; V3 and V4 for J 
                           avaScript/TypeScript. Currently, the V2 and  
                           V4 programming models are in preview.        
    --skip-npm-install     Skips the npm installation phase when using  
                           V4 programming model for NodeJS
    --no-docs              Do not create getting started documentation  
                           file. Currently supported when --worker-runt 
                           ime set to python.

logs    Gets logs of Functions running on custom backends
    --platform Hosting platform for the function app. Valid options: ku 
               bernetes
    --name     Function name


PS C:\Users\justinlyons\source\repos\conversational-banking\eqbank>     



