package asembly.voip.server.controller;

import asembly.voip.server.dto.SignalingMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SignalController {

    private static final Logger log = LoggerFactory.getLogger(SignalController.class);
    private final SimpMessagingTemplate messagingTemplate;

    public SignalController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/signal")
    public void handleSignal(SignalingMessage message) {
        log.info("Message: {}", message);
        messagingTemplate.convertAndSend("/topic/signal", message);
    }
}
