## WebRTC Voice Chat Service
Минималистичный P2P голосовой чат на WebRTC с сигнализацией через WebSocket (STOMP). Работает через NAT/Firewall с TURN relay.

<img width="314" height="586.4" alt="еуые-portrait" src="https://github.com/user-attachments/assets/0a07440d-c87b-4c1c-a6e0-381b32b7dc56" />
<img width="3840" height="2160" alt="localhost_3000_ (1)" src="https://github.com/user-attachments/assets/9d535723-1ed3-46ef-b82b-c19f614da9f5" />

## Технологии
* Frontend: Next.js 15 + TypeScript + React

* Backend: Java Spring Boot 3.x + WebSocket (STOMP) + Maven

* Протоколы: WebRTC (ICE/STUN/TURN) + WebSocket + STOMP over SockJS

* Deployment: Docker (опционально)

## Быстрый запуск
1. Клонируйте и настройте окружение
   ``` bash
   git clone <your-repo>
   cd webrtc-voice-chat
   ```
   Клиент (.env.local):
   ``` bash
   cp client/.env.example .env.local
   # Отредактируйте NEXT_PUBLIC_WEBSOCKET и NEXT_PUBLIC_ICE_SERVERS
   ```
   Сервер (application.yml):
    ``` bash
    server/src/main/resources/application.yml
    # Настройте server.port, server.address
    ```
2. Запуск Backend (Spring Boot)
    ``` bash
    cd server
    mvn spring-boot:run
    # http://localhost:8080 + ws://localhost:8080/ws
    ```
3. Запуск Frontend (Next.js)
   ``` bash
   cd client
   npm install
   npm run dev
   # http://localhost:3000
   ```
4. Тестирование
   * Откройте 2+ вкладки localhost:3000
   * Нажмите "Подключиться" и дайте разрешение на микрофон
   * На второй вкладке, нажмите "Создать" и аналогично дайте разрешение на запись звука
   * Говорите, на кнопку "Заглушить"/"Включить" управляйте громкостью микрофона
