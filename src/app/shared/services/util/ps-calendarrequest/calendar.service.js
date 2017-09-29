import angular from 'angular';
const URL = "https://nrg-frontend-task-api.herokuapp.com/";
const URL_COUNTRIES = "https://restcountries.eu/rest/v2/all";
let timeSlots = [];
const SERVICE_NAME = "calendarService";
let stylist = null;

// $http param
const phones= [
	{value:"+213",name:"Algeria"},
{value:"+376",name:"Andorra"},
{value:"+244",name:"Angola"},
{value:"+1264",name:"Anguilla"},
{value:"+1268",name:"Antigua &amp; Barbuda"},
{value:"+54",name:"Argentina"},
{value:"+374",name:"Armenia"},
{value:"+297",name:"Aruba"},
{value:"+61",name:"Australia"},
{value:"+43",name:"Austria"},
{value:"+994",name:"Azerbaijan"},
{value:"+1242",name:"Bahamas"},
{value:"+973",name:"Bahrain"},
{value:"+880",name:"Bangladesh"},
{value:"+1246",name:"Barbados"},
{value:"+375",name:"Belarus"},
{value:"+32",name:"Belgium"},
{value:"+501",name:"Belize"},
{value:"+229",name:"Benin"},
{value:"+1441",name:"Bermuda"},
{value:"+975",name:"Bhutan"},
{value:"+591",name:"Bolivia"},
{value:"+387",name:"Bosnia Herzegovina"},
{value:"+267",name:"Botswana"},
{value:"+55",name:"Brazil"},
{value:"+673",name:"Brunei"},
{value:"+359",name:"Bulgaria"},
{value:"+226",name:"Burkina Faso"},
{value:"+257",name:"Burundi"},
{value:"+855",name:"Cambodia"},
{value:"+237",name:"Cameroon"},
{value:"+1",name:"Canada"},
{value:"+238",name:"Cape Verde Islands"},
{value:"+1345",name:"Cayman Islands"},
{value:"+236",name:"Central African Republic"},
{value:"+56",name:"Chile"},
{value:"+86",name:"China"},
{value:"+57",name:"Colombia"},
{value:"+269",name:"Comoros"},
{value:"+242",name:"Congo"},
{value:"+682",name:"Cook Islands"},
{value:"+506",name:"Costa Rica"},
{value:"+385",name:"Croatia"},
{value:"+53",name:"Cuba"},
{value:"+90392",name:"Cyprus North"},
{value:"+357",name:"Cyprus South"},
{value:"+42",name:"Czech Republic"},
{value:"+45",name:"Denmark"},
{value:"+253",name:"Djibouti"},
{value:"+1809",name:"Dominica"},
{value:"+1809",name:"Dominican Republic"},
{value:"+593",name:"Ecuador"},
{value:"+20",name:"Egypt"},
{value:"+503",name:"El Salvador"},
{value:"+240",name:"Equatorial Guinea"},
{value:"+291",name:"Eritrea"},
{value:"+372",name:"Estonia"},
{value:"+251",name:"Ethiopia"},
{value:"+500",name:"Falkland Islands"},
{value:"+298",name:"Faroe Islands"},
{value:"+679",name:"Fiji"},
{value:"+358",name:"Finland"},
{value:"+33",name:"France"},
{value:"+594",name:"French Guiana"},
{value:"+689",name:"French Polynesia"},
{value:"+241",name:"Gabon"},
{value:"+220",name:"Gambia"},
{value:"+7880",name:"Georgia"},
{value:"+49",name:"Germany"},
{value:"+233",name:"Ghana"},
{value:"+350",name:"Gibraltar"},
{value:"+30",name:"Greece"},
{value:"+299",name:"Greenland"},
{value:"+1473",name:"Grenada"},
{value:"+590",name:"Guadeloupe"},
{value:"+671",name:"Guam"},
{value:"+502",name:"Guatemala"},
{value:"+224",name:"Guinea"},
{value:"+245",name:"Guinea - Bissau"},
{value:"+592",name:"Guyana"},
{value:"+509",name:"Haiti"},
{value:"+504",name:"Honduras"},
{value:"+852",name:"Hong Kong"},
{value:"+36",name:"Hungary"},
{value:"+354",name:"Iceland"},
{value:"+91",name:"India"},
{value:"+62",name:"Indonesia"},
{value:"+98",name:"Iran"},
{value:"+964",name:"Iraq"},
{value:"+353",name:"Ireland"},
{value:"+972",name:"Israel"},
{value:"+39",name:"Italy"},
{value:"+1876",name:"Jamaica"},
{value:"+81",name:"Japan"},
{value:"+962",name:"Jordan"},
{value:"+7",name:"Kazakhstan"},
{value:"+254",name:"Kenya"},
{value:"+686",name:"Kiribati"},
{value:"+850",name:"Korea North"},
{value:"+82",name:"Korea South"},
{value:"+965",name:"Kuwait"},
{value:"+996",name:"Kyrgyzstan"},
{value:"+856",name:"Laos"},
{value:"+371",name:"Latvia"},
{value:"+961",name:"Lebanon"},
{value:"+266",name:"Lesotho"},
{value:"+231",name:"Liberia"},
{value:"+218",name:"Libya"},
{value:"+417",name:"Liechtenstein"},
{value:"+370",name:"Lithuania"},
{value:"+352",name:"Luxembourg"},
{value:"+853",name:"Macao"},
{value:"+389",name:"Macedonia"},
{value:"+261",name:"Madagascar"},
{value:"+265",name:"Malawi"},
{value:"+60",name:"Malaysia"},
{value:"+960",name:"Maldives"},
{value:"+223",name:"Mali"},
{value:"+356",name:"Malta"},
{value:"+692",name:"Marshall Islands"},
{value:"+596",name:"Martinique"},
{value:"+222",name:"Mauritania"},
{value:"+269",name:"Mayotte"},
{value:"+52",name:"Mexico"},
{value:"+691",name:"Micronesia"},
{value:"+373",name:"Moldova"},
{value:"+377",name:"Monaco"},
{value:"+976",name:"Mongolia"},
{value:"+1664",name:"Montserrat"},
{value:"+212",name:"Morocco"},
{value:"+258",name:"Mozambique"},
{value:"+95",name:"Myanmar"},
{value:"+264",name:"Namibia"},
{value:"+674",name:"Nauru"},
{value:"+977",name:"Nepal"},
{value:"+31",name:"Netherlands"},
{value:"+687",name:"New Caledonia"},
{value:"+64",name:"New Zealand"},
{value:"+505",name:"Nicaragua"},
{value:"+227",name:"Niger"},
{value:"+234",name:"Nigeria"},
{value:"+683",name:"Niue"},
{value:"+672",name:"Norfolk Islands"},
{value:"+670",name:"Northern Marianas"},
{value:"+47",name:"Norway"},
{value:"+968",name:"Oman"},
{value:"+680",name:"Palau"},
{value:"+507",name:"Panama"},
{value:"+675",name:"Papua New Guinea"},
{value:"+595",name:"Paraguay"},
{value:"+51",name:"Peru"},
{value:"+63",name:"Philippines"},
{value:"+48",name:"Poland"},
{value:"+351",name:"Portugal"},
{value:"+1787",name:"Puerto Rico"},
{value:"+974",name:"Qatar"},
{value:"+262",name:"Reunion"},
{value:"+40",name:"Romania"},
{value:"+7",name:"Russia"},
{value:"+250",name:"Rwanda"},
{value:"+378",name:"San Marino"},
{value:"+239",name:"Sao Tome &amp; Principe"},
{value:"+966",name:"Saudi Arabia"},
{value:"+221",name:"Senegal"},
{value:"+381",name:"Serbia"},
{value:"+248",name:"Seychelles"},
{value:"+232",name:"Sierra Leone"},
{value:"+65",name:"Singapore"},
{value:"+421",name:"Slovak Republic"},
{value:"+386",name:"Slovenia"},
{value:"+677",name:"Solomon Islands"},
{value:"+252",name:"Somalia"},
{value:"+27",name:"South Africa"},
{value:"+34",name:"Spain"},
{value:"+94",name:"Sri Lanka"},
{value:"+290",name:"St. Helena"},
{value:"+1869",name:"St. Kitts"},
{value:"+1758",name:"St. Lucia"},
{value:"+249",name:"Sudan"},
{value:"+597",name:"Suriname"},
{value:"+268",name:"Swaziland"},
{value:"+46",name:"Sweden"},
{value:"+41",name:"Switzerland"},
{value:"+963",name:"Syria"},
{value:"+886",name:"Taiwan"},
{value:"+7",name:"Tajikstan"},
{value:"+66",name:"Thailand"},
{value:"+228",name:"Togo"},
{value:"+676",name:"Tonga"},
{value:"+1868",name:"Trinidad &amp; Tobago"},
{value:"+216",name:"Tunisia"},
{value:"+90",name:"Turkey"},
{value:"+7",name:"Turkmenistan"},
{value:"+993",name:"Turkmenistan"},
{value:"+1649",name:"Turks &amp; Caicos Islands"},
{value:"+688",name:"Tuvalu"},
{value:"+256",name:"Uganda"},
{value:"+44",name:"UK"},
{value:"+380",name:"Ukraine"},
{value:"+971",name:"United Arab Emirates"},
{value:"+598",name:"Uruguay"},
{value:"+1",name:"USA" },
{value:"+7",name:"Uzbekistan"},
{value:"+678",name:"Vanuatu"},
{value:"+379",name:"Vatican City"},
{value:"+58",name:"Venezuela"},
{value:"+84",name:"Vietnam"},
{value:"+84",name:"Virgin Islands - British"},
{value:"+84",name:"Virgin Islands - US"},
{value:"+681",name:"Wallis &amp; Futuna"},
{value:"+969",name:"Yemen (North"},
{value:"+967",name:"Yemen (South"},
{value:"+260",name:"Zambia"},
{value:"+263",name:"Zimbabwe"}
];

function getTimeSlots($http)
{
	const URL_GET_SLOTS = `${URL}timeslots`;
	return $http.get(URL_GET_SLOTS);
}

function submitAppointment($http,data)
{
	const URL_GET_SLOTS = `${URL}appointments`;
	return $http.post(URL_GET_SLOTS,data);
}

function getCountryPhoneCodes($http)
{
	return phones;
}

function assignStylistName(name)
{

	stylist = name;
	return  function(){return stylist;}
}


function calendarRequestService()
{

	return{
		getTimeSlots: getTimeSlots,
		getCountryPhoneCodes:getCountryPhoneCodes,
		submitAppointment:submitAppointment,
		assignStylistName:assignStylistName
	}
}

calendarRequestService.$inject = ["$http"];

export { SERVICE_NAME as calendarRequestServiceName, calendarRequestService };