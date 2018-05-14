package pl.arabella.user.arabella;

import android.content.ContentValues;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import javax.security.auth.login.LoginException;

public class RegisterActivity extends AppCompatActivity {

    SQLiteOpenHelper openHelper;
    SQLiteDatabase db;
    Button btRegister;
    EditText etFirstName, etLastName, etEmail, etPassword, etPassword2, etPesel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        openHelper = new DatabaseHelper(this);
        etFirstName = (EditText)findViewById(R.id.etFirstName);
        etLastName = (EditText)findViewById(R.id.etLastName);
        etEmail = (EditText)findViewById(R.id.etEmail);
        etPassword = (EditText)findViewById(R.id.etPassword);
        etPassword2 = (EditText)findViewById(R.id.etPassword2);
        etPesel = (EditText)findViewById(R.id.etPesel);
        btRegister = (Button)findViewById(R.id.btRegister);

        btRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                db=openHelper.getWritableDatabase();
                String fname = etFirstName.getText().toString();
                String lname = etLastName.getText().toString();
                String email = etEmail.getText().toString();
                String pass = etPassword.getText().toString();
                String pass2 = etPassword2.getText().toString();
                String pesel = etPesel.getText().toString();

                if(validate(fname, lname, email, pass, pass2, pesel).equals("correct")) {
                    insertdata(fname, lname, pass, email, pesel);
                    Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                    startActivity(intent);
                    finish();
                    Toast.makeText(getApplicationContext(), "Zarejestrowano!",Toast.LENGTH_LONG).show();
                }

                else {
                    if(validate(fname, lname, email, pass, pass2, pesel).equals("wrong_pesel")) {
                        Toast.makeText(getApplicationContext(), "Błędny PESEL!",Toast.LENGTH_SHORT).show();
                    }
                    else if(validate(fname, lname, email, pass, pass2, pesel).equals("wrong_email")) {
                        Toast.makeText(getApplicationContext(), "Błędny E-Mail!",Toast.LENGTH_SHORT).show();
                    }
                    else if(validate(fname, lname, email, pass, pass2, pesel).equals("password_mismatch")) {
                        Toast.makeText(getApplicationContext(), "Hasła nie są takie same!",Toast.LENGTH_SHORT).show();
                    }
                }

            }
        });
    }

    public String validate(String fname, String lname, String email, String pass, String pass2, String pesel) {
        if(pass.equals(pass2)) {
            if(email.matches("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")) {
                if(pesel.matches("^\\d{11}$")){
                    return "correct";
                }
                else {
                    return "wrong_pesel";
                }
            }
            else {
                return "wrong_email";
            }
        }
        else {
            return "password_mismatch";
        }
    }

    public void insertdata(String fname, String lname, String pass, String email, String phone){
        ContentValues contentValues = new ContentValues();
        contentValues.put(DatabaseHelper.COL_2, fname);
        contentValues.put(DatabaseHelper.COL_3, lname);
        contentValues.put(DatabaseHelper.COL_4, pass);
        contentValues.put(DatabaseHelper.COL_5, email);
        contentValues.put(DatabaseHelper.COL_6, phone);
        long id = db.insert(DatabaseHelper.TABLE_NAME, null, contentValues);
    }

}
