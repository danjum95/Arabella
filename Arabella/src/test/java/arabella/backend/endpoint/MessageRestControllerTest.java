package arabella.backend.endpoint;

import arabella.backend.model.Message;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MessageRestControllerTest {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;
    @Before
    public void init() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

    }


    @Test
    public void getMsg() throws Exception {
        String req;
        ResultActions result = mvc.perform(get("/api/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","28a4b466fdc590c")
        )
                .andDo(print())
                .andExpect(status().isOk());

        String content = result.andReturn().getResponse().getContentAsString();

    }

    @Test
    public void forwhocansend() throws Exception {
        String req;
        ResultActions result = mvc.perform(get("/api/messages/users")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","28a4b466fdc590c")
        )
                .andDo(print())
                .andExpect(status().isOk());

        String content = result.andReturn().getResponse().getContentAsString();

    }


    @Test
    public void wrongUser() throws Exception {
        String req;
        ResultActions result = mvc.perform(get("/api/messages/users")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andDo(print())
                .andExpect(status().isBadRequest());

        String content = result.andReturn().getResponse().getContentAsString();

    }

    @Test
    public void sendMsg() throws Exception {
        String req;
        ResultActions result = mvc.perform(put("/api/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Token","28a4b466fdc590c")
                .content("{\"receiverId\": \"1\",\"message\": \"Moja testowa wiadomosc\"}")
        )
                .andDo(print())
                .andExpect(jsonPath("$.senderId").value("4"))
                .andExpect(jsonPath("$.receiverId").value("1"))
                .andExpect(status().isOk());

        String content = result.andReturn().getResponse().getContentAsString();

    }
}