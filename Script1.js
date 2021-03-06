// JavaScript source code
'use strict';

const winston = require('winston');

class Logger {

    create() {
        // logger 파일 생성
        const logger = winston.createLogger({
            level: 'info', // log level
            format: winston.format.json(),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                // 문서에서 확인해보면 더 많은 설정을 볼 수있다.

                // 파일 저장 로그 설정 (error log 위치)
                new winston.transports.File({ filename: 'error.log', level: 'error', prettyPrint: true }),
                // 파일 저장 로그 설정 (info log 설정)
                new winston.transports.File({ filename: 'info.log', prettyPrint: true })
            ],
            colorize: true,
            humanReadableUnhandledException: true
        });

        // 운영중이지 않을 경우 콘솔에 출력 추가
        if (process.env.NODE_ENV !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }

        return logger;
    }
};

module.exports = new Logger();