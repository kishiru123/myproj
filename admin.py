from flask import Blueprint, request, render_template, flash, redirect, url_for, session,jsonify
import pymysql


con_admin = pymysql.connect(
    host='localhost',
    user="root",
    password="",
    database="apartment",
    cursorclass=pymysql.cursors.DictCursor
)

admins=Blueprint('admins',__name__)


#Admin Area
@admins.route('/Admin/user-Profile')
def Admin_Profile():
    return render_template('adminprofile.html')


@admins.route('/Admin-Dashboard', methods=['POST', 'GET'])
def Admin_dashboard():
    throw_data = con_admin.cursor()

    if request.method == 'GET':
        print("Received GET request for Admin Dashboard.")
        
        # Fetch user data from the database
        throw_data.execute("""
            SELECT 
                a.userid, 
                a.name, 
                a.address, 
                a.plate_number, 
                a.roomNumber, 
                l.email
            FROM 
                apartmentsingup a 
            JOIN 
                loginapartment l ON a.userid = l.loginid
        """)
        
        data = throw_data.fetchall()
        print("Raw data from DB:", data)  # Debug print for raw data

        # Prepare user data as a list of dictionaries
        users = [
            {
                'userid': row['userid'],
                'name': row['name'],
                'address': row['address'],
                'plate_number': row['plate_number'],
                'roomNumber': row['roomNumber'],
                'email': row['email']
            }
            for row in data
        ]
        
        print("Formatted user data:", users)  # Debug print for formatted user data

        # Check if the request is AJAX
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            print("AJAX request detected. Returning JSON.")
            return jsonify(users)  # Return JSON for AJAX
        else:
            print("Rendering HTML with user data.")
            return render_template("Admin.html", users=users)  # Render HTML for normal requests

    # Handle POST requests
    if request.method == 'POST':
        data = request.json
        print("Received POST request with data:", data)  # Debug print for incoming POST data
        
        action = data.get('action')

        if data.get('action') == 'add':
            try:
                # First, insert into apartmentsingup to get the userid
                throw_data.execute("INSERT INTO apartmentsingup (name, address, plate_number, roomNumber) VALUES (%s, %s, %s, %s)",
                                (data['name'], data['address'], data['plate_number'], data['roomNumber']))
                # Get the last inserted userid
                login_id = throw_data.lastrowid
                
                # Now, insert into loginapartment with the new userid
                throw_data.execute("INSERT INTO loginapartment (loginid, email, password) VALUES (%s, %s, %s)",
                                (login_id, data['email'], data['password']))  # Save password as is
                
                con_admin.commit()
                return jsonify({'status': 'Data added'}), 201
            except Exception as e:
                con_admin.rollback()  # Rollback on error
                print("Error while adding user:", e)
                return jsonify({'status': 'Error', 'message': str(e)}), 500


        elif action == 'update':
            # Update existing user
            print("Updating user:", data)
            throw_data.execute(
                "UPDATE loginapartment SET email = %s, password = %s WHERE loginid = %s",
                (data['email'], data['password'], data['userid'])
            )
            throw_data.execute(
                "UPDATE apartmentsingup SET name = %s, address = %s, plate_number = %s, roomNumber = %s WHERE userid = %s",
                (data['name'], data['address'], data['plate_number'], data['roomNumber'], data['userid'])
            )
            con_admin.commit()
            print("User updated successfully.")
            return jsonify({'status': 'Data updated'}), 200

        elif action == 'delete':
            # Delete user
            print("Deleting user with ID:", data['userid'])
            throw_data.execute("DELETE FROM loginapartment WHERE loginid = %s", (data['userid'],))
            throw_data.execute("DELETE FROM apartmentsingup WHERE userid = %s", (data['userid'],))
            con_admin.commit()
            print("User deleted successfully.")
            return jsonify({'status': 'Data deleted'}), 200

    # Fallback to render HTML for any unmatched requests
    print("Rendering HTML for initial load.")
    return render_template("Admin.html")




@admins.route('/Apartments')
def Admin_Apartment():
    return render_template('ApartmentList.html')


@admins.route('/Admin-Maintenance')
def Admin_Maintenance():
    return render_template("Admin_umaintenance.html")


@admins.route('/Lease_management')
def Admin_lease():
    return render_template('Admin_lease.html')


@admins.route('/Emergency_Records')
def Admin_Emergency():
    return render_template('EmergencyRec.html')

@admins.route('/Visitor-Engament')
def visitorlogs():
    return render_template('adminanalytics.html')

