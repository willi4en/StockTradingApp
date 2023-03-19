# StockTradingApp

Paper Trading App using TD Ameritrade's API for stock data, React as front-end, and a Python back-end

# To set up the frontend for development

1. Navigate to the 'client' directory
2. Install node packages with `npm install`

# To set up the backend for development

1. Navigate to the 'server' directory
2. Create a local virtual environment by running `python -m venv venv`
3. Install local python packages with `pip install flask python-dotenv`

# To run the project for development

1. Navigate to the 'server' directory and source the virtual environment with `source venv/Scripts/activate`
2. Navigate to the 'client' directory. We can run both applications from here thanks to the scripts available in the package.json
3. Start up the frontend by running `npm start-frontend`
4. In a second terminal, start up the backend by running `npm start-backend`
