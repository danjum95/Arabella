package arabella.backend.endpoint;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class StudentRestControllerTest {
    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void KursantDontGetInfo() throws Exception {

        ResultActions result = mvc.perform(get("/api/students/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","5c98c785b140c567")

        )
                .andDo(print())
                .andExpect(status().isUnauthorized());

    }

    @Test
    public void GetInfo() throws Exception {

        ResultActions result = mvc.perform(get("/api/students/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a53f3bc5fb7f18")

        )
                .andDo(print())
                .andExpect(status().isOk());

    }
}