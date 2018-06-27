package pl.arabella.user.arabella;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.github.sundeepk.compactcalendarview.CompactCalendarView;
import com.github.sundeepk.compactcalendarview.domain.Event;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class CalendarROActivity extends AppCompatActivity {

    TextView tvMonth;
    CompactCalendarView compactCalendar;
    Button btBack;
    RequestQueue queue;
    String url;
    private String authToken;
    List<MyEvent> Events = new ArrayList<MyEvent>();
    //JSONArray MyEvents;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar_ro);
        tvMonth = (TextView)findViewById(R.id.tvMonth);
        compactCalendar = (CompactCalendarView) findViewById(R.id.compactcalendar_view);
        compactCalendar.setUseThreeLetterAbbreviation(true);
        tvMonth.setText(MonthToString(compactCalendar.getFirstDayOfCurrentMonth().getMonth()) + " " + String.valueOf(compactCalendar.getFirstDayOfCurrentMonth().getYear()));
        btBack = (Button)findViewById(R.id.btBack);
        queue = Volley.newRequestQueue(this);
        Intent startIntent = getIntent();
        setAuthToken(startIntent.getStringExtra("_authToken"));
        //MyEvents = new JSONArray();
        //JSONObject singleEv;
        //String singleData;
        //Date FinalDate = null;
        //DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault());
        final AlertDialog alertDialog = new AlertDialog.Builder(CalendarROActivity.this, R.style.MyDialogTheme).create();

        //WCZYTYWANIE JAZD
        url = "http://orlean.ski:8090/api/get/lessons/android";
        JSONObject JSON_Params = new JSONObject();
        JSONArray Params = new JSONArray();
        try { JSON_Params.put("token", getAuthToken()); }
        catch (JSONException e) { e.printStackTrace(); }
        Params.put(JSON_Params);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.POST, url, Params,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault());
                        JSONObject singleEv = null;
                        Date FinalDate = null;
                        Event _Event = null;

                        for(int i = 0; i < response.length(); i++) {
                            //Toast.makeText(getApplicationContext(), response.get(i).toString(), Toast.LENGTH_SHORT).show();
                            try { singleEv = response.getJSONObject(i); }
                            catch (JSONException e) { e.printStackTrace(); }
                            try { try { FinalDate = df.parse(singleEv.get("date").toString()); }
                            catch (ParseException e) { e.printStackTrace(); } }
                            catch (JSONException e) { e.printStackTrace(); }
                            _Event = new Event(Color.WHITE, FinalDate.getTime(), singleEv);
                            compactCalendar.addEvent(_Event);
                            Events.add(new MyEvent(_Event, FinalDate, singleEv));
                        }
                    }
                },
                new Response.ErrorListener(){
                    @Override
                    public void onErrorResponse(VolleyError error){
                        // TODO: Handle error
                        Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }
        );
        queue.add(jsonArrayRequest);
        //END

        compactCalendar.setListener(new CompactCalendarView.CompactCalendarViewListener() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onDayClick(Date dateClicked) {
                for(int i = 0; i < Events.size(); i++) {
                    if(dateClicked.getTime() == Events.get(i).getComparableDate().getTime()) {
                        alertDialog.setTitle("JAZDY");
                        //DATE, ENDDATE, NAME -> instruktor,
                        try { alertDialog.setMessage(new String("Godzina rozpoczęcia:\n" + Events.get(i).getData().get("date").toString().split("T")[1]
                                + "\n\nGodzina zakończenia:\n" + Events.get(i).getData().get("endDate").toString().split("T")[1] + "\n\nInstruktor:\n" +
                                Events.get(i).getData().get("name").toString())); //STRING
                        }
                        catch (JSONException e) { e.printStackTrace(); }
                        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        dialog.dismiss();
                                    }
                                });
                        alertDialog.show();
                    }
                }
            }

            @Override
            public void onMonthScroll(Date firstDayOfNewMonth) {
                //actionBar.setTitle(dateFormatMonth.format(firstDayOfNewMonth));
                tvMonth.setText(MonthToString(firstDayOfNewMonth.getMonth()) + " " + String.valueOf(firstDayOfNewMonth.getYear()));
            }
        });

        //WRÓĆ
        btBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        // END

    }

    String MonthToString(int x) {
        if (x == 0)
            return "Styczeń";
        if (x == 1)
            return "Luty";
        if (x == 2)
            return "Marzec";
        if (x == 3)
            return "Kwiecień";
        if (x == 4)
            return "Maj";
        if (x == 5)
            return "Czerwiec";
        if (x == 6)
            return "Lipiec";
        if (x == 7)
            return "Sierpień";
        if (x == 8)
            return "Wrzesień";
        if (x == 9)
            return "Październik";
        if (x == 10)
            return "Listopad";
        if (x == 11)
            return "Grudzień";
        else
            return "Error!";
    }
    public String getAuthToken() { return authToken; }
    public void setAuthToken(String authToken) { this.authToken = authToken; }

    @Override
    protected void onRestart() {
        super.onRestart();
        compactCalendar.removeAllEvents();
        url = "http://orlean.ski:8090/api/get/lessons/android";
        JSONObject JSON_Params = new JSONObject();
        JSONArray Params = new JSONArray();
        try { JSON_Params.put("token", getAuthToken()); }
        catch (JSONException e) { e.printStackTrace(); }
        Params.put(JSON_Params);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.POST, url, Params,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault());
                        JSONObject singleEv = null;
                        Date FinalDate = null;
                        Event _Event = null;

                        for(int i = 0; i < response.length(); i++) {
                            //Toast.makeText(getApplicationContext(), response.get(i).toString(), Toast.LENGTH_SHORT).show();
                            try { singleEv = response.getJSONObject(i); }
                            catch (JSONException e) { e.printStackTrace(); }
                            try { try { FinalDate = df.parse(singleEv.get("date").toString()); }
                            catch (ParseException e) { e.printStackTrace(); } }
                            catch (JSONException e) { e.printStackTrace(); }
                            _Event = new Event(Color.WHITE, FinalDate.getTime(), singleEv);
                            compactCalendar.addEvent(_Event);
                            Events.add(new MyEvent(_Event, FinalDate, singleEv));
                        }
                    }
                },
                new Response.ErrorListener(){
                    @Override
                    public void onErrorResponse(VolleyError error){
                        // TODO: Handle error
                        Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }
        );
        queue.add(jsonArrayRequest);
    }

}
