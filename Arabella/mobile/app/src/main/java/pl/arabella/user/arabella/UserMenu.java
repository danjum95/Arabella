package pl.arabella.user.arabella;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class UserMenu extends AppCompatActivity {
    Button btMap;
    TextView welcomeUsername;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_menu);
        Intent startIntent = getIntent();
        welcomeUsername = (TextView)findViewById(R.id.tvUsername);
        welcomeUsername.setText("Zalogowany jako:\n" + startIntent.getStringExtra("_name") + " " + startIntent.getStringExtra("_surname"));

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
        startActivity(intent);
        finish();
    }
}
