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

public class UserMenu extends AppCompatActivity {
    Button btMap;
    TextView welcomeUsername;
    RequestQueue queue;
    String url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_menu);
        queue = Volley.newRequestQueue(this);

        welcomeUsername = (TextView)findViewById(R.id.tvUsername);
        Intent startIntent = getIntent();

        url = "http://orlean.ski:8090/api/user/info";
        JSONObject JSON_Params = new JSONObject();
        try {
            //JSON_Params.put("Content-Type", "application/json");
            JSON_Params.put("token", startIntent.getStringExtra("_authToken"));
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {
//surname name
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            welcomeUsername.setText("Zalogowany jako:\n" + response.get("name").toString() + " " + response.get("surname").toString());
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


        //welcomeUsername.setText("Zalogowany jako:\n" + startIntent.getStringExtra("_name") + " " + startIntent.getStringExtra("_surname"));

        btMap = (Button)findViewById(R.id.btMap);
        btMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserMenu.this, MapActivity.class);
                startActivity(intent);
            }
        });
    }

    public void onClick(View view) {
        Intent intent = new Intent(UserMenu.this, LoginActivity.class);
        Toast.makeText(getApplicationContext(), "Wylogowano!", Toast.LENGTH_SHORT).show();
        startActivity(intent);
        finish();
    }
}
