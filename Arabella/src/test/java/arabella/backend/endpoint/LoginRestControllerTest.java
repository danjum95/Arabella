package arabella.backend.endpoint;


import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginRestControllerTest {


    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void loginCorrect() throws Exception {

        ResultActions result = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum@wp.pl\",\"password\": \"danjum\"}")
        )
                .andDo(print())
                .andExpect(jsonPath("$.userId").value("4"))
                .andExpect(status().isOk());



    }

    @Test
    public void wrongpass() throws Exception {

        ResultActions result = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum@wp.pl\",\"password\": \"studeddnt\"}")
        )
                .andDo(print())
                .andExpect(status().isConflict());



    }

    @Test
    public void loginIncorrect() throws Exception {

        ResultActions result = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum@wp.pl\"}")
        )
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No password field or value"));



    }

    @Test
    public void loginIncorrectonlypass() throws Exception {

        ResultActions result = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"password\": \"danjum\"}")
        )
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No email field or value"));



    }

    @Test
    public void nodata() throws Exception {

        ResultActions result = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andDo(print())
                .andExpect(status().isBadRequest());



    }
}