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

        ResultActions result = mvc.perform(put("/api/lessons")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2475ab4d5a31f2b0")
                .content("{\"studentId\": \"4\",\"date\": \"2019-03-12T12:30:00\",\"endDate\": \"2019-03-12T15:30:00\"}")

        )
                .andDo(print())
                .andExpect(status().isOk());

    }


    @Test
    public void GetMinutesasSchoolforRequestUsers() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/drove")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a53f3bc5fb7f18")
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for students"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void GetMinutesastUsers() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/drove")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","522290504c486cfb")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getMinutesAsSchool() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/{studentId}/of/school/{schoolId}/drove",3,0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a53f3bc5fb7f18")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }


    @Test
    public void getMinutesAsUserinEnpointForSchool() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/how/many/minutes/student/{studentId}/of/school/{schoolId}/drove",3,0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a52fa86b537c01")
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for instructor or school"))
                .andExpect(status().isBadRequest());

    }

    /*@Test
    public void getMinutesAsInstructor() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/students/drives/durations")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2475ab4d5a31f2b0")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }*/

    @Test
    public void getMinutesAsInstructorinEnpointForSchool() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/students/drives/durations")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","522290504c486cfb")
        )
                .andDo(print())
                .andExpect(content().string("Endpoint only for instructor or school"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void getLessonsAsInstructor() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","522290504c486cfb")
        )
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void getLessonsAsSchool() throws Exception {

        ResultActions result = mvc.perform(get("/api/lessons/of/school/{schoolId}",0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a53f3bc5fb7f18")
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