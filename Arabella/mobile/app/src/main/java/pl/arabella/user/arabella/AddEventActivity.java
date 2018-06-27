package pl.arabella.user.arabella;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.format.DateFormat;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;

public class AddEventActivity extends AppCompatActivity implements DatePickerDialog.OnDateSetListener, TimePickerDialog.OnTimeSetListener {

    StringBuilder ParsedData;
    TextView tvDate, tvTime;
    EditText etEmail, etLength;
    Button btConfirm, btBack, btSetDate, btSetTime;
    RequestQueue queue;
    String url;
    private String authToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_event);
        tvDate = (TextView)findViewById(R.id.tvDate);
        tvTime = (TextView)findViewById(R.id.tvTime);
        etEmail = (EditText)findViewById(R.id.etEmail);
        etLength = (EditText)findViewById(R.id.etLength);
        btSetDate = (Button)findViewById(R.id.btSetDate);
        btSetTime = (Button)findViewById(R.id.btSetTime);
        btBack = (Button)findViewById(R.id.btBack);
        btConfirm = (Button)findViewById(R.id.btConfirm);
        queue = Volley.newRequestQueue(this);
        Intent startIntent = getIntent();
        setAuthToken(startIntent.getStringExtra("_authToken"));

        final Calendar calendar = Calendar.getInstance();
        int yy = calendar.get(Calendar.YEAR);
        int MM = calendar.get(Calendar.MONTH);
        int dd = calendar.get(Calendar.DAY_OF_MONTH);
        int hh = calendar.get(Calendar.HOUR_OF_DAY);
        int mm = calendar.get(Calendar.MINUTE);

        if(String.valueOf(MM + 1).length() == 1 && String.valueOf(dd).length() == 1)
            tvDate.setText("0" + String.valueOf(dd) + ".0" + String.valueOf(MM + 1) + "." + String.valueOf(yy));
        else if(String.valueOf(MM + 1).length() == 1)
            tvDate.setText(String.valueOf(dd) + ".0" + String.valueOf(MM + 1) + "." + String.valueOf(yy));
        else if(String.valueOf(dd).length() == 1)
            tvDate.setText("0" + String.valueOf(dd) + "." + String.valueOf(MM + 1) + "." + String.valueOf(yy));
        else
            tvDate.setText(String.valueOf(dd) + "." + String.valueOf(MM + 1) + "." + String.valueOf(yy));

        if(String.valueOf(hh).length() == 1 && String.valueOf(mm).length() == 1)
            tvTime.setText("0" + String.valueOf(hh) + ":" + "0" + String.valueOf(mm));
        else if(String.valueOf(hh).length() == 1)
            tvTime.setText("0" + String.valueOf(hh) + ":" + String.valueOf(mm));
        else if(String.valueOf(mm).length() == 1)
            tvTime.setText(String.valueOf(hh) + ":" + "0" + String.valueOf(mm));
        else
            tvTime.setText(String.valueOf(hh) + ":" + String.valueOf(mm));

        //USTAWIANIE DATY!
        btSetDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DatePickerDialog datePickerDialog = new DatePickerDialog(AddEventActivity.this, R.style.MyDialogTheme, AddEventActivity.this,
                        yy, MM, dd);
                datePickerDialog.show();
            }
        });
        //END

        //USTAWIANIE GODZINY!
        btSetTime.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TimePickerDialog timePickerDialog = new TimePickerDialog(AddEventActivity.this, R.style.MyDialogTheme,AddEventActivity.this,
                        hh, mm, DateFormat.is24HourFormat(AddEventActivity.this));
                timePickerDialog.show();
            }
        });
        //END

        //DODAWANIE JAZD!
        btConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                url = "http://orlean.ski:8090/api/add/lesson";
                JSONObject JSON_Params = new JSONObject();
                ParsedData = new StringBuilder();
                ParsedData.append(tvDate.getText().toString().split("\\.")[2] + "-");
                ParsedData.append(tvDate.getText().toString().split("\\.")[1] + "-");
                ParsedData.append(tvDate.getText().toString().split("\\.")[0] + "T");
                ParsedData.append(tvTime.getText().toString().split("\\:")[0] + ":");
                ParsedData.append(tvTime.getText().toString().split("\\:")[1] + ":00");
                //Toast.makeText(getApplicationContext(), tvDate.getText().toString().split("\\.")[0], Toast.LENGTH_SHORT).show();
                try {
                    JSON_Params.put("token", getAuthToken());
                    JSON_Params.put("email", etEmail.getText().toString());
                    JSON_Params.put("date", ParsedData.toString());
                    JSON_Params.put("length", etLength.getText().toString());
                }
                catch (JSONException e) { e.printStackTrace(); }
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                        (Request.Method.POST, url, JSON_Params, new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                Toast.makeText(getApplicationContext(), "Dodano jazdy!", Toast.LENGTH_SHORT).show();
                            }
                        }, new Response.ErrorListener() {

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                // TODO: Handle error
                                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        });
                queue.add(jsonObjectRequest);
                finish();
            }
        });
        //END

        //BACK
        btBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        //END

    }

    public String getAuthToken() { return authToken; }
    public void setAuthToken(String authToken) { this.authToken = authToken; }

    @Override
    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
        String date;
        if(String.valueOf(month + 1).length() == 1 && String.valueOf(dayOfMonth).length() == 1)
            date = "0" + String.valueOf(dayOfMonth) + ".0" + String.valueOf(month + 1) + "." + String.valueOf(year);
        else if(String.valueOf(month + 1).length() == 1)
            date = String.valueOf(dayOfMonth) + ".0" + String.valueOf(month + 1) + "." + String.valueOf(year);
        else if(String.valueOf(dayOfMonth).length() == 1)
            date = "0" + String.valueOf(dayOfMonth) + "." + String.valueOf(month + 1) + "." + String.valueOf(year);
        else
            date = String.valueOf(dayOfMonth) + "." + String.valueOf(month + 1) + "." + String.valueOf(year);
        tvDate.setText(date);
    }

    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
        String time;
        if(String.valueOf(hourOfDay).length() == 1 && String.valueOf(minute).length() == 1)
            time = "0" + String.valueOf(hourOfDay) + ":" + "0" + String.valueOf(minute);
        else if(String.valueOf(hourOfDay).length() == 1)
            time = "0" + String.valueOf(hourOfDay) + ":" + String.valueOf(minute);
        else if(String.valueOf(minute).length() == 1)
            time = String.valueOf(hourOfDay) + ":" + "0" + String.valueOf(minute);
        else
            time = String.valueOf(hourOfDay) + ":" + String.valueOf(minute);
        tvTime.setText(time);
    }

}
