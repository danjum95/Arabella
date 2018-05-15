package ar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Controller
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    private boolean isEmptyParam(Map<String,String> userParam)
    {
        Collection<String> values = userParam.values();
        for (String value : values)
        {
            if(value.equals(""))
                return true;
        }
        return false;
    }

    @GetMapping("/register")
    public String registerPage(){
        return "register";
    }

    @RequestMapping(name="/register", method=RequestMethod.POST)
    public @ResponseBody String registerUser(@RequestParam Map<String, String> userParam, Model model){
        if(isEmptyParam(userParam)) {
            model.addAttribute("error","Pozostawiono puste pole");
            return "nok";
        }
        User newUser = new User();
        newUser.setName(userParam.get("name"));
        newUser.setSurname(userParam.get("surname"));
        newUser.setPassword(userParam.get("password"));
        newUser.setEmail(userParam.get("email"));
        userRepository.save(newUser);
        return "ok";
    }
}
