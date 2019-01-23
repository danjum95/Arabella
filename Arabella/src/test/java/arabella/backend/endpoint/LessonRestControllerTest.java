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
public class LessonRestControllerTest {

    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void addLesson() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"piotr.owsiak@wp.pl\",\"password\": \"instruktor\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        System.out.println(resultString);

        String token = JsonPath.parse(resultString).read("$.token");


        ResultActions result = mvc.perform(put("/api/lessons")
                .contentType(MediaType.APPLICATION_JSON)//jan
                .header("Token",token)
                .content("{\"studentId\": \"2\",\"date\": \"2090-03-12T12:30:00\",\"endDate\": \"2090-03-12T15:00:00\"}")

        )
                .andDo(print())
                .andExpect(status().isOk());

    }


    @Test
    public void GetMinutesasSchoolforRequestUsers() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"osk\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/drove")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for students"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void GetMinutesastUsers() throws Exception {
        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gmail.com\",\"password\": \"kursant\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");


        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/drove")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getMinutesAsSchool() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"osk\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/{studentId}/of/school/{schoolId}/drove",3,0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }


    @Test
    public void getMinutesAsUserinEnpointForSchool() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gmail.com\",\"password\": \"kursant\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/{studentId}/of/school/{schoolId}/drove",3,0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for instructor or school"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void getMinutesAsInstructor() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/students/drives/durations")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getMinutesAsKursantinEnpointForSchool() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gmail.com\",\"password\": \"kursant\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");


        ResultActions result = mvc.perform(get("/api/lessons/students/drives/durations")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for instructor or school"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void getLessonsAsInstructor() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"danjum95@gamil.com\",\"password\": \"danjum\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getLessonsAsSchool() throws Exception {

        ResultActions res
                = mvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"paw.kow95@wp.pl\",\"password\": \"osk\"}"));

        String resultString = res.andReturn().getResponse().getContentAsString();

        String token = JsonPath.parse(resultString).read("$.token");

        ResultActions result = mvc.perform(get("/api/lessons/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token",token)
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void addMissionLesson() throws Exception {

        ResultActions result = mvc.perform(put("/api/lessons")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2475ab4d5a31f2b0")
                .content("{\"date\": \"2019-03-12T12:30:00\",\"endDate\": \"2019-03-12T15:30:00\"}")

        )
                .andDo(print())
                .andExpect(status().isNotFound());

    }
}