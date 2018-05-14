package ar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UsersController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public String users(){
        return "users";
    }

    @GetMapping("/allUsers")
    public String getAllUsers(Model model){
        model.addAttribute("users",userRepository.findAll());
        return "users";
    }
}
