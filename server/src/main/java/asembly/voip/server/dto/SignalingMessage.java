package asembly.voip.server.dto;

public record SignalingMessage(String event, String clientId, Object data) {}