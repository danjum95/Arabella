package com.arabella.www.speaktome;

import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_screen);
    }
    public void Listen(View view)
    {
        TextView text = (TextView)findViewById(R.id.startText);
        text.setText("SŁUCHAM");
    }
}
