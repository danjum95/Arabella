package pl.arabella.user.arabella;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    SQLiteDatabase db;
    SQLiteOpenHelper openHelper;
    Cursor cursor;
    Button btLogin;
    EditText etEmail, etPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etEmail = (EditText)findViewById(R.id.etEmail);
        etPassword = (EditText)findViewById(R.id.etPassword);
        btLogin = (Button)findViewById(R.id.btLogin);
        openHelper = new DatabaseHelper(this);
        db = openHelper.getReadableDatabase();

        btLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = etEmail.getText().toString();
                String pass = etPassword.getText().toString();

                cursor = db.rawQuery("SELECT *FROM " + DatabaseHelper.TABLE_NAME + " WHERE " + DatabaseHelper.COL_5 + "=? AND " + DatabaseHelper.COL_4 + "=?", new String[]{email, pass});
                if (cursor != null) {
                    if (cursor.getCount() > 0) {
                        Intent intent = new Intent(LoginActivity.this, UserMenu.class);
                        while(cursor.moveToNext()) {
                            intent.putExtra("_name", cursor.getString(1));
                            intent.putExtra("_surname", cursor.getString(2));
                            //TUTAJ NIE INDEKSY 2 i 3 TAK JAK W TABELI TYLKO 1 I 2 BO CURSOR INDEKSUJE SOBIE OD -1 CHUJ WIE CZEMU
                        }
                        startActivity(intent);
                        finish();
                    } else {
                        Toast.makeText(getApplicationContext(), "Error!", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

    }

    public void onClick(View view) {
        // REJESTRACJA intent() ->>
        Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
        startActivity(intent);
    }
}
