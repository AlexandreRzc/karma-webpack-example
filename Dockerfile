FROM node:7.5.0-wheezy

RUN apt-get update && apt-get install -y xvfb chromium

ENV DISPLAY :99
ENV CHROME_BIN /usr/bin/chromium

RUN mkdir workspace
ADD . workspace

WORKDIR workspace
RUN npm install

RUN chmod +x ./entrypoint.sh

#ENTRYPOINT ["./entrypoint.sh"]
#CMD ["npm", "test"]
CMD ["sh", "/sleep.sh"]
