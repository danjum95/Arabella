package pl.arabella.user.arabella;

import com.github.sundeepk.compactcalendarview.domain.Event;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MyEvent {
    private Event e;
    private Date d;
    private JSONObject Data;

    MyEvent(Event _e, Date _d, JSONObject _Data) {
        this.e = _e;
        this.d = _d;
        this.Data = _Data;
    }

    public Event getEvent() {
        return e;
    }


    public Date getDate() {
        return d;
    }


    public JSONObject getData() {
        return Data;
    }

    public Date getComparableDate() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault());
        Date comparableDate = new Date();
        try { comparableDate = df.parse(getData().get("date").toString()); }
        catch (ParseException e1) { e1.printStackTrace(); }
        catch (JSONException e1) { e1.printStackTrace(); }
        comparableDate.setHours(0);
        comparableDate.setMinutes(0);
        comparableDate.setSeconds(0);
        return comparableDate;
    }
}
