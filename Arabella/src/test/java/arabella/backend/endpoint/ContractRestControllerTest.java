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
public class ContractRestControllerTest {

    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void getContractsOK() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"osk\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/contract")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getContractsUnauthorized() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/contract")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isUnauthorized());

    }

    @Test
    public void makeContractwithInsT1() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gmail.com\",\"password\": \"kursant\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/contract/instructor/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isConflict());

    }

    @Test
    public void makeContractwithStudent() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/contract/student/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isConflict());

    }

    @Test
    public void changeContracttest1() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/contract/change/status/of/{schoolId}",5)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
                .content("{\"status\": \"2\"}")
        )
                .andDo(print())
                .andExpect(content().string("Contact with that id doesn't exists"))
                .andExpect(status().isNotFound());

    }

    @Test
    public void changeContracttest3() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");


        ResultActions result = mvc.perform(put("/api/contract/change/status/of/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
                .content("{\"status\": \"1\"}")
        )
                .andDo(print())
                .andExpect(content().string("Contact with that id doesn't exists"))
                .andExpect(status().isNotFound());

    }
    @Test
    public void changeContracttest1error() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(put("/api/contract/change/status/of/{schoolId}",5)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isBadRequest());

    }

    @Test
    public void missingFields() throws Exception {

        ResultActions result = mvc.perform(put("/api/contract/change/status/of/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\": \"1\"}")
        )
                .andDo(print())
                .andExpect(status().isBadRequest());

    }


}