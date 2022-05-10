import { Message, MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default {
  callback: async (message: Message, ...args: string[]) => {
    const OWAPI = process.env.OWAPI;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&appid=${OWAPI}&units=imperial`;
    console.log(url);

    let city;

    try {
      city = await axios.get(url);
    } catch (error) {
      message.reply('Sorry, can not get the weather');
      console.log(error);
      return;
    }
    console.log(city.data);

    city = city.data;
    const morning = 'AM';
    let night = 'AM';

    const sunrise = new Date((city.sys.sunrise + city.timezone) * 1000);
    const sunrise_string = sunrise.toUTCString().toString().substring(17, 22);
    console.log(sunrise);
    console.log(sunrise_string);
    const sunset = new Date((city.sys.sunset + city.timezone) * 1000);
    let sunset_string = sunset.toUTCString().toString().substring(17, 22);
    let nighttime = +sunset_string.substring(0, 2);
    if (nighttime > 12) {
      nighttime = nighttime - 12;
      night = 'PM';
      sunset_string = `${nighttime}:${sunrise_string.substring(3, 5)}`;
    }
    console.log(nighttime);
    console.log(sunset);
    console.log(sunset_string);

    const embed = new MessageEmbed()
      .setColor('#CA3ADB')
      .setTitle(`Current Weater in ${args} - ${city.sys.country} `)
      .setThumbnail(
        `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
      )
      .setDescription(
        `${Math.round(city.main.temp)} °F and ${city.weather[0].description}`
      )
      .addFields(
        {
          name: 'Low',
          value: `${Math.round(city.main.temp_min)} °F`,
          inline: true,
        },
        {
          name: 'High',
          value: `${Math.round(city.main.temp_max)} °F`,
          inline: true,
        }
      )
      .addFields({
        name: '\u200b',
        value: '\u200b',
        inline: false,
      })
      .addFields(
        {
          name: 'Sunrise',
          value: `${sunrise_string} AM`,
          inline: true,
        },
        {
          name: 'Sunset',
          value: `${sunset_string} ${night}`,
          inline: true,
        }
      );

    message.channel.send({ embeds: [embed] });
  },
};
