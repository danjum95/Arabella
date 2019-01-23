package arabella.backend.endpoint;

import com.jayway.jsonpath.JsonPath;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SchoolRestControllerTest {
    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void GetSchoolsInfo() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"pawkow\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/schools")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)

        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void SchoolExists() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"pawkow\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/schools")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
                .content("{\"name\": \"OSK Warszawa\"}")


        )
                .andDo(print())
                .andExpect(content().string("Already a school"))
                .andExpect(status().isNotAcceptable());

    }

    @Test
    public void SchoolError() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"pawkow\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/schools")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
                .content("{\"testname\": \"OSK Warszawa\"}")


        )
                .andDo(print())
                .andExpect(status().isNotFound());

    }
}