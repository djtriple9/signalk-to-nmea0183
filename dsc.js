/*
1     2  3          4  5  6  7          8    9  10 11 12 13
|     |  |          |  |  |  |          |    | |  |  |  |
$CDDSC,12,3380400790,12,06,00,1423108312,2019, ,  , S, E*6A
   1. $CDDSC–from a DSC radio.
   2. 12–distress alert call.
   3. 3381581370–the MMSI of the sender.
   4. 12–category is “distress.”
   5. 06–Nature of Distress is“adrift.”
   6. 00–preferred follow-on communication by frequency- or phase-modulated simplex radio telephony.
   7. 1423108312–position, which 42-degrees 31-minutes latitude, 083-degrees 12-minutes longitude, in North and West.
   8. 0236–message was sent at 0236-UTC.
   9. 3381581370–now the new information! This is a repeat of the MMSI of the sender. 
   NOTE: In ITU-Rec. M.493-13, in Table 4.2 there is a footnote which says, “Distress acknowledgments where the transmitting MMSI and ship in distress MMSI are
   the same, the message should be interpreted as a self Cancel operation.” This field MUST be “the address of vessel in distress” if the message is a distress
   acknowledgement message.
   10. [null]–still no signal in this field.
   11. S–end of sequence.
   12. [null]–no expansion message to follow; “E” - expansion message to follow.
   13. 20–checksum.
*/
// NMEA0183 Encoder DSC   $CDDSC,12,3380400790,00,21,26,1423108312,2021,,,B, E*73

const nmea = require('../nmea.js')
module.exports = function (app) {
  return {
    sentence: 'DSC',
    title: '(CD)DSC - Digital Selective Calling Information',
    keys: ['navigation.two, navigation.three, navigation.four, navigation.five, navigation.six,navigation.seven, nacigation.eight, navigation.nine, navigation.ten, nagivation.eleven, navigation.twelve, navigation.thirteen'],
    f: function dsc (two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen) {
      var datetime = new Date(eight)
      var hours = ('00' + datetime.getHours()).slice(-2)
      var minutes = ('00' + datetime.getMinutes()).slice(-2)
      var seconds = ('00' + datetime.getSeconds()).slice(-2)
      return nmea.toSentence([
        '$CDDSC',
        nmea.toNmeaDegreesLatitude(position.latitude),
        nmea.toNmeaDegreesLongitude(position.longitude),
        hours + minutes + seconds + '.020',
        'A'
      ])
    }
  }
}
