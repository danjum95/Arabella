package pl.arabella.user.arabella;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class InstructorMenuActivity extends AppCompatActivity {

    Button btProfile, btMessages, btMap, btCalendar;
    TextView welcomeUsername;
    RequestQueue queue;
    String url;
    private String authToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_instructor_menu);
        welcomeUsername = (TextView)findViewById(R.id.tvUsername);
        btProfile = (Button)findViewById(R.id.btProfile);
        btMessages = (Button)findViewById(R.id.btMessages);
        btCalendar = (Button)findViewById(R.id.btCalendar);
        btMap = (Button)findViewById(R.id.btMap);
        queue = Volley.newRequestQueue(this);
        Intent startIntent = getIntent();
        setAuthToken(startIntent.getStringExtra("_authToken"));

        //USTAWIANIE WELCOME MESSAGE
        url = "http://orlean.ski:8090/api/user/info";
        JSONObject JSON_Params = new JSONObject();
        try { JSON_Params.put("token", getAuthToken()); }
        catch (JSONException e) { e.printStackTrace(); }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {
                    //surname name
                    @Override
                    public void onResponse(JSONObject response) {

                        try {
                            welcomeUsername.setText("Witaj!" + "\n" + response.get("name").toString() + " " + response.get("surname").toString());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // TODO: Handle error
                        Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                });
        queue.add(jsonObjectRequest);
        //END

        //PROFILE INFO + ZMIANA HASŁA
        btProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InstructorMenuActivity.this, ProfileActivity.class);
                intent.putExtra("_authToken", getAuthToken());
                startActivity(intent);
            }
        });
        //END

        //WIADOMOŚCI
        btMessages.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InstructorMenuActivity.this, MessengerActivity.class);
                intent.putExtra("_authToken", getAuthToken());
                startActivity(intent);
            }
        });
        //END

        //KALENDARZ
        btCalendar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InstructorMenuActivity.this, CalendarActivity.class);
                intent.putExtra("_authToken", getAuthToken());
                startActivity(intent);
            }
        });
        //END

        //MAPA
        btMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(InstructorMenuActivity.this, MapActivity.class);
                startActivity(intent);
            }
        });
        //END

    } //ONCREATE END;

    //WYLOGOWANIE
    public void onClick(View view) {
        Intent intent = new Intent(InstructorMenuActivity.this, LoginActivity.class);
        Toast.makeText(getApplicationContext(), "Wylogowano!", Toast.LENGTH_SHORT).show();
        startActivity(intent);
        finish();
    }
    //END

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
