package pl.arabella.user.arabella;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

public class MessengerActivity extends AppCompatActivity {

    Button btSend, btViewMsgs, btBack;
    RequestQueue queue;
    String url;
    private String authToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_messenger);
        btSend = (Button)findViewById(R.id.btSend);
        btViewMsgs = (Button)findViewById(R.id.btViewMsgs);
        btBack = (Button)findViewById(R.id.btBack);
        queue = Volley.newRequestQueue(this);
        Intent startIntent = getIntent();
        setAuthToken(startIntent.getStringExtra("_authToken"));


        //WRÓĆ
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
