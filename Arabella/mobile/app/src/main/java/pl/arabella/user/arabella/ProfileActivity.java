package pl.arabella.user.arabella;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

public class ProfileActivity extends AppCompatActivity {

    Button btPassword, btBack;
    TextView ProfileInfo;
    RequestQueue queue;
    String url;
    StringBuilder ParsedInfo;
    private String authToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        ProfileInfo = (TextView)findViewById(R.id.tvInfo);
        btPassword = (Button)findViewById(R.id.btPassword);
        btBack = (Button)findViewById(R.id.btBack);
        ParsedInfo = new StringBuilder();
        queue = Volley.newRequestQueue(this);
        Intent startIntent = getIntent();
        setAuthToken(startIntent.getStringExtra("_authToken"));

        //PROFILE INFO
        url = "http://orlean.ski:8090/api/user/info";
        JSONObject JSON_Params = new JSONObject();
        try { JSON_Params.put("token", getAuthToken()); }
        catch (JSONException e) { e.printStackTrace(); }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if (response.get("accountType").equals("1"))
                                ParsedInfo.append("Instruktor" + "\n");
                            if (response.get("accountType").equals("2"))
                                ParsedInfo.append("Kursant" + "\n");
                            ParsedInfo.append(response.get("name") + "\n");
                            ParsedInfo.append(response.get("surname") + "\n");
                            ParsedInfo.append(response.get("email"));
                        } catch (JSONException e) { e.printStackTrace(); }
                        ProfileInfo.setText(ParsedInfo.toString());
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

        //CHANGE PASSWORD
        btPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater layoutInflater = LayoutInflater.from(ProfileActivity.this);
                View promptView = layoutInflater.inflate(R.layout.change_password_dialog, null);
                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(ProfileActivity.this, R.style.MyDialogTheme);
                alertDialogBuilder.setView(promptView);

                final EditText etOld = (EditText) promptView.findViewById(R.id.etOld);
                final EditText etNew = (EditText) promptView.findViewById(R.id.etNew);
                final EditText etRepeat = (EditText) promptView.findViewById(R.id.etRepeat);

                alertDialogBuilder.setCancelable(false)
                        .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                url = "http://orlean.ski:8090/api/change/password";
                                JSONObject JSON_Params = new JSONObject();
                                try {
                                    JSON_Params.put("token", getAuthToken());
                                    JSON_Params.put("old", etOld.getText().toString());
                                    JSON_Params.put("new", etNew.getText().toString());
                                }
                                catch (JSONException e) { e.printStackTrace(); }
                                if (etNew.getText().toString().equals(etRepeat.getText().toString())) {
                                    JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                                            (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {
                                                //surname name
                                                @Override
                                                public void onResponse(JSONObject response) {
                                                    Toast.makeText(getApplicationContext(), "Zmieniono hasło!", Toast.LENGTH_SHORT).show();
                                                }
                                            }, new Response.ErrorListener() {

                                                @Override
                                                public void onErrorResponse(VolleyError error) {
                                                    // TODO: Handle error
                                                    Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                                                }
                                            });
                                    queue.add(jsonObjectRequest);
                                }
                                else {
                                    Toast.makeText(getApplicationContext(), "Hasła różnią się od siebie!", Toast.LENGTH_SHORT).show();
                                }
                            }
                        })

                        .setNegativeButton("WRÓĆ", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel();
                            }
                        });

                AlertDialog alert = alertDialogBuilder.create();
                alert.show();
            }
        });
        //END

        //GET BACK
        btBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        //END
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
