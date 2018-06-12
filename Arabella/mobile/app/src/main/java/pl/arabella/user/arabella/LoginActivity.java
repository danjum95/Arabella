package pl.arabella.user.arabella;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    String authToken;

    //SQLiteDatabase db;
    //SQLiteOpenHelper openHelper;
    //Cursor cursor;
    Button btLogin;
    EditText etEmail, etPassword;
    RequestQueue queue;
    String url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etEmail = (EditText)findViewById(R.id.etEmail);
        etPassword = (EditText)findViewById(R.id.etPassword);
        btLogin = (Button)findViewById(R.id.btLogin);
        //openHelper = new DatabaseHelper(this);
        //db = openHelper.getReadableDatabase();

        queue = Volley.newRequestQueue(this);

        btLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = etEmail.getText().toString();
                String pass = etPassword.getText().toString();

                url = "http://orlean.ski:8090/api/login";
                JSONObject JSON_Params = new JSONObject();
                try {
                    //JSON_Params.put("Content-Type", "application/json");
                    JSON_Params.put("email", email);
                    JSON_Params.put("password", pass);
                }
                catch (JSONException e) {
                    e.printStackTrace();
                }

                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                        (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {

                            @Override
                            public void onResponse(JSONObject response) {
                                Toast.makeText(getApplicationContext(), "Zalogowano!", Toast.LENGTH_SHORT).show();
                                try {
                                    authToken = response.get("token").toString();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                Intent intent = new Intent(LoginActivity.this, UserMenu.class);
                                intent.putExtra("_authToken", authToken);
                                startActivity(intent);
                                finish();
                            }
                        }, new Response.ErrorListener() {

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                // TODO: Handle error
                                Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                            }
                        });

                queue.add(jsonObjectRequest);


                /*cursor = db.rawQuery("SELECT *FROM " + DatabaseHelper.TABLE_NAME + " WHERE " + DatabaseHelper.COL_5 + "=? AND " + DatabaseHelper.COL_4 + "=?", new String[]{email, pass});
                if (cursor != null) {
                    if (cursor.getCount() > 0) {
                        Intent intent = new Intent(LoginActivity.this, UserMenu.class);
                        while(cursor.moveToNext()) {
                            intent.putExtra("_name", cursor.getString(1));
                            intent.putExtra("_surname", cursor.getString(2));
                            //TUTAJ NIE INDEKSY 2 i 3 TAK JAK W TABELI TYLKO 1 I 2 BO CURSOR INDEKSUJE OD -1
                        }
                        startActivity(intent);
                        finish();
                    } else {
                        Toast.makeText(getApplicationContext(), "Error!", Toast.LENGTH_SHORT).show();
                    }
                }*/
            }
        });

    }

    public void onClick(View view) {
        // REJESTRACJA intent() ->>
        Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
        startActivity(intent);
    }

}