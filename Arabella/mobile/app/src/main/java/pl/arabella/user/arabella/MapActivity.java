package pl.arabella.user.arabella;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.mapbox.geojson.GeoJson;
import com.mapbox.mapboxsdk.geometry.LatLng;

import org.json.JSONException;
import org.json.JSONObject;


public class MapActivity extends AppCompatActivity implements LocationListener {

    public boolean locationInit = false;
    final static int PERMISSION_ALL = 1;
    final static String[] PERMISSIONS = {android.Manifest.permission.ACCESS_COARSE_LOCATION, android.Manifest.permission.ACCESS_FINE_LOCATION};
    LocationManager locationManager;
    WebView webView;
    Button btAdd, btSave;
    //TextView coords;
    JSONObject PointJSON = new JSONObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
/*
        try {
            PointJSON.put("title", "Punkt Testowy");
        } catch (JSONException e) {
            e.printStackTrace();
        }
*/
        btAdd = (Button)findViewById(R.id.btAdd);
        btSave = (Button)findViewById(R.id.btSave);
        webView = (WebView)findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebChromeClient(new CustomWebChromeClient());
        webView.addJavascriptInterface(new IJavascriptHandler(), "AndroidApp");
        webView.loadUrl("file:///android_asset/www/index.html");
        //coords = (TextView)findViewById(R.id.tvCoords);
        //coords.setText(String.valueOf(location.getLatitude()) + " " + String.valueOf(location.getLongitude()));

        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 23 && !isPermissionGranted()) {
            requestPermissions(PERMISSIONS, PERMISSION_ALL);
        } else requestLocation();
        if (!isLocationEnabled())
            showAlert(1);

        btAdd.setOnClickListener(new View.OnClickListener() { //DODANIE PUNKTU KONTROLNEGO
            @Override
            public void onClick(View v) {
                if(locationInit == true) {

                    LayoutInflater layoutInflater = LayoutInflater.from(MapActivity.this);
                    View promptView = layoutInflater.inflate(R.layout.input_dialog, null);
                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(MapActivity.this, R.style.MyDialogTheme);
                    alertDialogBuilder.setView(promptView);

                    final EditText editText = (EditText) promptView.findViewById(R.id.edittext);
                    // setup a dialog window
                    alertDialogBuilder.setCancelable(false)
                            .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    //resultText.setText("Hello, " + editText.getText());
                                    try {
                                        PointJSON.put("title", editText.getText());
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }

                                    callJavaScript(webView, "addPoint", PointJSON);
                                }
                            })
                            .setNegativeButton("WRÓĆ",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(DialogInterface dialog, int id) {
                                            dialog.cancel();
                                        }
                                    });

                    // create an alert dialog
                    AlertDialog alert = alertDialogBuilder.create();
                    alert.show();
                }
                else {
                    Toast.makeText(getApplicationContext(), "Lokalizajca nie została jeszcze zainicjowana!", Toast.LENGTH_SHORT).show();
                }
            }
        });

        btSave.setOnClickListener(new View.OnClickListener() { //ZAPISYWANIE PUNKTÓW KONTROLNYCH
            @Override
            public void onClick(View v) {
                //webView.loadUrl("javascript:android.onData(exportToGeoJSON)");
                callJavaScript_NO_SEP(webView, "exportToGeoJSON", "currentPointsLayer");
            }
        });

    }

    final class IJavascriptHandler {
        IJavascriptHandler() {
        }

        @JavascriptInterface
        public void GeoJSON_ToAndroid(GeoJson obj) {
            // this is called from JS with passed value
            Toast t = Toast.makeText(getApplicationContext(), obj.toString(), 2000);
            t.show();
        }
    }

    class CustomWebChromeClient extends WebChromeClient {
        private static final String TAG = "CustomWebChromeClient";

        @Override
        public boolean onConsoleMessage(ConsoleMessage cm) {
            Log.d(TAG, String.format("%s @ %d: %s", cm.message(),
                    cm.lineNumber(), cm.sourceId()));
            return true;
        }
    }

    private void callJavaScript(WebView view, String methodName, Object...params){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("javascript:try{");
        stringBuilder.append(methodName);
        stringBuilder.append("(");
        String separator = "";
        for (Object param : params) {
            stringBuilder.append(separator);
            separator = ",";
            if(param instanceof String){
                stringBuilder.append("'");
            }
            stringBuilder.append(param);
            if(param instanceof String){
                stringBuilder.append("'");
            }

        }
        stringBuilder.append(")}catch(error){console.error(error.message);}");
        final String call = stringBuilder.toString();
        Log.i("CustomWebChromeClient", "callJavaScript: call="+call);

        view.loadUrl(call);
    }

    private void callJavaScript_NO_SEP(WebView view, String methodName, Object...params){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("javascript:try{");
        stringBuilder.append(methodName);
        stringBuilder.append("(");
        String separator = "";
        for (Object param : params) {
            stringBuilder.append(separator);
            separator = ",";
            stringBuilder.append(param);
        }
        stringBuilder.append(")}catch(error){console.error(error.message);}");
        final String call = stringBuilder.toString();
        Log.i("CustomWebChromeClient", "callJavaScript: call="+call);

        view.loadUrl(call);
    }

    @Override
    public void onLocationChanged(Location location) {
        LatLng myCoordinates = new LatLng(location.getLatitude(), location.getLongitude());
        if(locationInit == false) {
            callJavaScript(webView, "updateCurrentPosition", myCoordinates.getLatitude(),  myCoordinates.getLongitude());
            callJavaScript(webView, "startDrawing");
            locationInit = true;
        }
        else {
            callJavaScript(webView, "updateCurrentPosition", myCoordinates.getLatitude(), myCoordinates.getLongitude());
        }
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    private void requestLocation() {
        Criteria criteria = new Criteria();
        criteria.setAccuracy(Criteria.ACCURACY_FINE);
        criteria.setPowerRequirement(Criteria.POWER_HIGH);
        String provider = locationManager.getBestProvider(criteria, true);
        //locationManager.requestLocationUpdates(provider, 10000, 10, this);
        locationManager.requestLocationUpdates(provider, 10000, 10, this);
    }

    private boolean isLocationEnabled() {
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
    }

    private boolean isPermissionGranted() {
        if (checkSelfPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION)
                == PackageManager.PERMISSION_GRANTED || checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            Log.v("mylog", "Permission is granted");
            return true;
        } else {
            Log.v("mylog", "Permission not granted");
            return false;
        }
    }

    private void showAlert(final int status) {
        String message, title, btnText;
        if (status == 1) {
            message = "Your Locations Settings is set to 'Off'.\nPlease Enable Location to " +
                    "use this app";
            title = "Enable Location";
            btnText = "Location Settings";
        } else {
            message = "Please allow this app to access location!";
            title = "Permission access";
            btnText = "Grant";
        }
        final AlertDialog.Builder dialog = new AlertDialog.Builder(this, R.style.MyDialogTheme);
        dialog.setCancelable(false);
        dialog.setTitle(title)
                .setMessage(message)
                .setPositiveButton(btnText, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface paramDialogInterface, int paramInt) {
                        if (status == 1) {
                            Intent myIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                            startActivity(myIntent);
                        } else
                            requestPermissions(PERMISSIONS, PERMISSION_ALL);
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface paramDialogInterface, int paramInt) {
                        finish();
                    }
                });
        dialog.show();
    }

}