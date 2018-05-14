package ar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public String registerPage(){
        return "register";
    }

    @RequestMapping(name="/register", method=RequestMethod.POST)
    public @ResponseBody String registerUser(@RequestParam Map<String, String> userParam){
        User newUser = new User();
        newUser.setName(userParam.get("name"));
        newUser.setPassword(userParam.get("password"));
        newUser.setEmail(userParam.get("email"));
        userRepository.save(newUser);
        return "ok";
    }
}
