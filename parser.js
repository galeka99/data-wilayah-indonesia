const path = require('path');
const fs = require('fs');

const resultsDir = path.join(__dirname, 'results');

const provinsi = [];
const kota = [];
const kecamatan = [];
const kelurahan = [];

const provinsiResult = [];
const kotaResult = [];
const kecamatanResult = [];
const kelurahanResult = [];

console.log('Memuat data...');
const datas = require('./master_data.json');

console.log('Mensortir data...');
datas.forEach(data => {
  const id = data.code.split('.');
  const provinceId = parseInt(id[0]);
  const cityId = parseInt([id[0], id[1]].join(''));
  const districtId = parseInt([id[0], id[1], id[2]].join(''));
  const villageId = parseInt(data.code.replaceAll('.', ''));

  provinsi[id[0]] = {
    'id': provinceId,
    'name': data.province,
  };
  kota[[id[0], id[1]].join('')] = {
    'id': cityId,
    'name': data.city,
    'province_id': provinceId,
  };
  kecamatan[[id[0], id[1], id[2]].join('')] = {
    'id': districtId,
    'name': data.district,
    'city_id': cityId,
  };
  kelurahan[data.code.replaceAll('.', '')] = {
    'id': villageId,
    'name': data.village,
    'postal_code': data.postal,
    'latitude': data.latitude,
    'longitude': data.longitude,
    'elevation': data.elevation,
    'district_id': districtId,
  };
});

console.log('Memproses data provinsi...');
for (key in provinsi) provinsiResult.push(provinsi[key]);
fs.writeFileSync(path.join(resultsDir, 'provinsi.json'), JSON.stringify(provinsiResult, '\n', 2));

console.log('Memproses data kota/kabupaten...');
for (key in kota) kotaResult.push(kota[key]);
fs.writeFileSync(path.join(resultsDir, 'kota.json'), JSON.stringify(kotaResult, '\n', 2));

console.log('Memproses data kecamatan...');
for (key in kecamatan) kecamatanResult.push(kecamatan[key]);
fs.writeFileSync(path.join(resultsDir, 'kecamatan.json'), JSON.stringify(kecamatanResult, '\n', 2));

console.log('Memproses data kelurahan/desa...');
for (key in kelurahan) kelurahanResult.push(kelurahan[key]);
fs.writeFileSync(path.join(resultsDir, 'kelurahan.json'), JSON.stringify(kelurahanResult, '\n', 2));
