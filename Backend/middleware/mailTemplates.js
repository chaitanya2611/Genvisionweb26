// utils/mailTemplates.js
export const accommodationConfirmedTemplate = (name) => `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222">
        <p>Dear ${name || "Participant"},</p>

        <p>Thank you for registering for Genvision 2026. We are very glad to welcome you to our campus on the occasion of the 28th edition of Genvision on 10th and 11th of January 2026, the annual technical fest of the Department of Biosciences and Bioengineering (BSBE), IIT Bombay.</p>

        <p>This email confirmation should be shown at the campus gate and will serve as your entry confirmation.</p>

        <h4>Event and Accommodation Details</h4>
        <p>Accommodation will be available from: 9th January 2026, 11:00 AM<br>
        Hostel vacating time: On or before 12th January 2026, 10:00 AM</p>

        <p>The hostel number allotted to you will be mentioned in the list shared below. Room allocation will be done once you arrive on campus during check-in.</p>

        <p>We hope you enjoy our event and have a good time on our campus. To help you have a hassle-free experience, please note the following points:</p>

        <ul>
          <li>Kindly bring a valid college ID card and government-issued ID for campus entry.</li>
          <li>Entry and exit from the campus are allowed only between 8:00 AM and 8:00 PM. On the days of the event, this timing will be followed strictly. Please plan your travel accordingly.</li>
          <li>Participants are requested to go to their assigned hostels and collect the keys from the security desk or assigned coordinators by validating your ID and signing the entry and exit register. Please check the attached Google Sheet for your allotted hostel details.</li>
        </ul>

        <p>Click here to know your Hostel: <a href="https://docs.google.com/spreadsheets/d/1pRw9-w7KhyAZUZ4BPojPwO1URaoQTWNc1ARCHgs8R50/edit?gid=0#gid=0">Hostel Accommodation List</a></p>

        <h4>Hostel Maps:</h4>
        <ul>
          <li>Hostel 01 : <a href="https://maps.app.goo.gl/Sbuh2PTYSdynsbjG8">Link</a></li>
          <li>Hostel 04 : <a href="https://maps.app.goo.gl/GextY99oMuwm6Ddx8">Link</a></li>
          <li>Hostel 09 : <a href="https://goo.gl/maps/WXMsKKTQQHnSikVX9">Link</a></li>
          <li>Hostel 15 : <a href="https://maps.app.goo.gl/57oXVhLEnwiKo4ed8">Link</a></li>
          <li>Hostel 16 : <a href="https://maps.app.goo.gl/Mjqa8LFhBxUBX27L8">Link</a></li>
        </ul>

        <p>Campus Maps : <a href="https://insti.app/map">Link</a></p>

        <p>Ensure that all hostel amenities are returned at the time of departure. Any damage to the room will be penalized. Keep your belongings safe with you. The Symbiotek Council shall not be responsible for the misplacement of your items.</p>

        <p>Kindly DO NOT carry any narcotics, tobacco, or alcohol inside the campus. If caught, Symbiotek Council shall not be responsible for the consequences you face and legal actions will be followed.</p>

        <p>Kindly do not venture into restricted areas (lakeside after 6:00 PM, faculty housing area, Sameer Hills after 6:00 PM) to avoid any security concerns.</p>

        <p>Participants staying on campus are requested to follow hostel rules and curfew timings.</p>

        <h4>Contact Details</h4>
        <p>In case of any hospitality-related queries, feel free to reach out to:</p>
        <ul>
          <li>Shekhar: 8848269462</li>
          <li>Shikha: 96370 59478</li>
          <li>Vishesh: 62689 93494</li>
          <li>Sumedha: 83605 54035</li>
          <li>Kundan: 85294 58688</li>
          <li>Deepak: 95870 25832</li>
          <li>Prajna: 80934 85160</li>
        </ul>

        <p>Join this WhatsApp group for other accommodation related queries: <a href="https://chat.whatsapp.com/Dg8JC3QJVpOJahUolNwedq">Link</a></p>

        <p>We look forward to seeing you on 10th and 11th January 2026.</p>

        <p>With warm regards,<br>
        Symbiotek Council<br>
        Genvision 2026</p>
      </div>
`;
