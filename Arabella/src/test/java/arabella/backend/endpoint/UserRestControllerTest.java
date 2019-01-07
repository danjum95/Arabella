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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserRestControllerTest {
    @Autowired
    private WebApplicationContext wac;


    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }

    @Test
    public void getSchoolUsers() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/of/school/{schoolId}", 0)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","c9674cc63b11510")

        )
                .andDo(print())
                .andExpect(status().isOk());



    }

    @Test
    public void userInfo() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","522290504c486cfb")

        )
                .andDo(print())
                .andExpect(jsonPath("$.id").value("4"))
                .andExpect(jsonPath("$.firstName").value("Student"))
                .andExpect(jsonPath("$.lastName").value("Studentowski"))
                .andExpect(jsonPath("$.email").value("student@student.pl"))
                .andExpect(jsonPath("$.name").value("Student Studentowski"))
                .andExpect(status().isOk());



    }


    @Test
    public void getUserInfo() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"email\": \"student@student.pl\"}")

        )
                .andDo(print())
                .andExpect(status().isOk());



    }

    @Test
    public void getSpecificUser() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/{id}", 2)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","55be68a5d98b292d")

        )
                .andDo(print())
                .andExpect(jsonPath("$.email").value("szkola@szkola.pl"))
                .andExpect(status().isOk());



    }

    @Test
    public void getSpecificUserError() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/{id}", 10000)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","55be68a5d98b292d")

        )
                .andDo(print())
                .andExpect(content().string("User not found"))
                .andExpect(status().isNotFound());



    }

    @Test
    public void getUserInfo2() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"id\": \"4\"}")

        )
                .andDo(print())
                .andExpect(status().isOk());



    }

    @Test
    public void getUserInfoError2() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"id\": null}")
        )
                .andDo(print())
                .andExpect(status().isBadRequest());



    }

    @Test
    public void getUserInfoError1() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"email\": null}")
        )
                .andDo(print())
                .andExpect(status().isBadRequest());



    }

    @Test
    public void getUserInfoWrongMail() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"email\": \"testowymail@mail.pl\"}")
        )
                .andDo(print())
                .andExpect(content().string("User not found with given email"))
                .andExpect(status().isNotFound());



    }

    @Test
    public void getUserInfoWrongId() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/other/user/info")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2b6f9eaccc656827")
                .content("{\"id\": \"50000\"}")
        )
                .andDo(print())
                .andExpect(content().string("User not found with given id"))
                .andExpect(status().isNotFound());



    }

    @Test
    public void changepassexists() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/change/password")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","4bf7cfc295100d7")
                .content("{\"password\": \"janek\"}")
        )
                .andDo(print())
                .andExpect(status().isNotModified());
    }

    @Test
    public void changepassempty() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/change/password")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","4bf7cfc295100d7")
                .content("{\"password\": null}")
        )
                .andDo(print())
                .andExpect(content().string("Null or empty String as password"))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void changemailexists() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/change/email")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","4bf7cfc295100d7")
                .content("{\"email\": \"jan@test.pl\"}")
        )
                .andDo(print())
                .andExpect(status().isNotModified());
    }

    @Test
    public void changemailempty() throws Exception {

        ResultActions result = mvc.perform(post("/api/users/change/email")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","4bf7cfc295100d7")
                .content("{\"email\": null}")
        )
                .andDo(print())
                .andExpect(content().string("Null or empty String as email"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void instructortype() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/which/type/of/user", 10000)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","2475ab4d5a31f2b0")

        )
                .andDo(print())
                .andExpect(content().string("1"))
                .andExpect(status().isOk());

    }

    @Test
    public void kursanttype() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/which/type/of/user", 10000)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","5c98c785b140c567")

        )
                .andDo(print())
                .andExpect(content().string("2"))
                .andExpect(status().isOk());

    }

    @Test
    public void schooltype() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/which/type/of/user", 10000)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","71a53f3bc5fb7f18")

        )
                .andDo(print())
                .andExpect(content().string("0"))
                .andExpect(status().isOk());

    }

    @Test
    public void belongtoSchool() throws Exception {

        ResultActions result = mvc.perform(get("/api/users/which/school")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","5c98c785b140c567")

        )
                .andDo(print())
                .andExpect(status().isOk());

    }



}