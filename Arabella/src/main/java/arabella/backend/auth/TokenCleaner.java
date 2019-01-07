package arabella.backend.auth;

import arabella.backend.model.Token;
import arabella.backend.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TokenCleaner {
    private static final Logger log = LoggerFactory.getLogger(TokenCleaner.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Autowired
    TokenRepository tokenRepository;

    @Scheduled(fixedRate = 3600000)
    public void cleanTokens() {
        log.info("Cleaning tokens {}", dateFormat.format(new Date()));

        List<Token> tokens = tokenRepository.findAll();
        Long currentTime = System.currentTimeMillis();

        List<Token> tokensToRemove = tokens.stream().filter(token -> Optional.ofNullable(token.getExpDate()).orElse(0L) < currentTime).collect(Collectors.toList());
        tokenRepository.deleteAll(tokensToRemove);
    }
}
