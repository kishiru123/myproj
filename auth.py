from flask import Blueprint, request, render_template, flash, redirect, url_for, session
import pymysql

authen=pymysql.connect(host='irvinjay123.mysql.pythonanywhere-services.com',
                    user="irvinjay123",
                     password="",
                    database="default",
                    cursorclass=pymysql.cursors.DictCursor)


authenticated = Blueprint('authenticated', __name__)

@authenticated.route('/Sign-Up', methods=['POST', 'GET'])
def usersignup():
    if request.method == 'POST':
        name = request.form.get('signame')
        address = request.form.get('sigadd')
        platenum = request.form.get('platenum')
        Roomnumber = request.form.get('Roomno')
        email = request.form.get('sigmail')
        password = request.form.get('passwordField')
        retypepass = request.form.get('RepeatpasswordField')

        signup_area = authen.cursor()
        signup_area.execute('SELECT loginid FROM loginapartment WHERE email=%s', (email,))
        existed_email = signup_area.fetchone()

        signup_area.execute('SELECT userid FROM apartmentsingup WHERE roomNumber=%s', (Roomnumber,))
        existed_Room = signup_area.fetchone()

        if existed_email:
            flash('This email already exists', 'danger')
            return render_template('signup.html')
        
        if existed_Room:
            flash('This Room already Occupied', 'danger')
            return render_template('signup.html')

        if password != retypepass:
            flash('Password mismatch, please retry', 'danger')
            return render_template('signup.html')

        signup_area.execute(
            'INSERT INTO apartmentsingup(name, address, plate_number, roomNumber) VALUES (%s, %s, %s, %s)',
            (name, address, platenum, Roomnumber)
        )
        authen.commit() 

        userid = signup_area.lastrowid

        signup_area.execute(
            'INSERT INTO loginapartment(email, password, loginid, uservalue) VALUES (%s, %s, %s, %s)',
            (email, password, userid, '0')
        )
        authen.commit() 

        flash("Signup Complete", 'success')
        return redirect(url_for('authenticated.userlogin')) 
    return render_template('signup.html')

@authenticated.route('/Login', methods=['POST', 'GET'])
def userlogin():
    if request.method == 'POST':
        loginmail = request.form.get('logemail')
        logpassword = request.form.get('LoginpasswordField')

        # Print debug information
        print("sa email:", loginmail)
        print("sa pass:", logpassword)

        login_area = authen.cursor()

        # Query to get user information including user value
        login_area.execute('''
            SELECT loginid, uservalue
            FROM loginapartment
            WHERE email=%s AND password=%s
        ''', (loginmail, logpassword))

        user = login_area.fetchone()

        # Debugging output
        print("Fetched user:", user)

        if user:
            loginid = user['loginid']
            uservalue = user['uservalue']

            # Debugging output for user value
            print("User value:", uservalue)

            session['user_id'] = loginid
            session.permanent = True  # Ensure this is set to keep the session alive

            # Check user value
            if uservalue == 1:
                flash('Welcome, Admin!', 'success')
                return redirect(url_for('admins.Admin_dashboard'))  
            elif uservalue == 0:
                flash('Welcome, User!', 'success')
                return redirect(url_for('userdashboard')) 
            else:
                flash('Unknown user type', 'danger')
                return redirect(url_for('authenticated.userlogin')) 
        else:
            flash('Invalid email or password', 'danger')
            return redirect(url_for('authenticated.userlogin'))

    return render_template('login.html')

@authenticated.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))
