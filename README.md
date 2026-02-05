## WebRTC Voice Chat Service
Минималистичный P2P голосовой чат на WebRTC с сигнализацией через WebSocket (STOMP). Работает через NAT/Firewall с TURN relay.

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
