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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class InstructorRestControllerTest {
    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void Getinslistasschool() throws Exception {

        ResultActions result = mvc.perform(get("/api/instructors/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","3c2d3c73885655c7")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void Getinslistasuser() throws Exception {

        ResultActions result = mvc.perform(get("/api/instructors/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a52fa86b537c01")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

}