import sqlite3
import os
from flask import Flask, render_template, redirect, url_for, request, session


app = Flask(__name__)
app.secret_key = os.urandom(24)


def get_db_connection():
    try:
        connection = sqlite3.connect('./server/database.db')
    except Exception as e:
        print("Error:", e)
        if connection:
            connection.close()
    return connection


@app.route('/')
def landingPage():
    return render_template('landingPage.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        username = request.form['username']
        password = request.form['password']
        if username is None or password is None:
            return render_template('login.html', error="Please make sure all fields are filled out.")
        cur.execute(
            "SELECT * from users where username = (?) AND password = (?)", [username, password])
        user = cur.fetchone()
        if (user is not None):
            conn.close()
            session['currentUser'] = user[0]
            return render_template('login.html', error="Successful Login!")
            # return redirect(url_for('profile'))
        else:
            conn.close()
            return render_template('login.html', error="Invalid Login: Please try again.")
    elif request.method == 'GET':
        return render_template('login.html')


@app.route('/account_creation', methods=['GET', 'POST'])
def createAccount():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (username, password, firstName, lastName, email) VALUES (?,?,?,?,?)", [
                    username, password, firstName, lastName, email])
        conn.commit()
        conn.close()
        return redirect(url_for('landingPage'))
    elif request.method == 'GET':
        return render_template('createAccount.html')
