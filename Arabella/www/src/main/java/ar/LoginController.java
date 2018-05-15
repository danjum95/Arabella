package ar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestParam Map<String,String> loginParam, Model model)
    {
        Iterable<User> userDB = userRepository.findAll();
        for(User user:userRepository.findAll())
        {
            if(user.getEmail().equals(loginParam.get("email")))
            {
                if(user.getPassword().equals(loginParam.get("password")))
                    return  "ok";
            }
        }
        model.addAttribute("error","Brak takiego uzytkownika lub niepoprawne haslo");
        return "nok";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login()
    {
        return "login";
    }
}
