const  mongoose=require('mongoose')
const { Schema } = mongoose;


const teacherSchema=mongoose.Schema({
    TeacherId:String,
    name:String,
    fatherName:String,
    email:String,
    number:String,
    role:String,
    dob:String,
    married:String,
    nationality:String,
    birthCertificate:String,
    gender:String,
    NID:String,
    passport:String,
    bio:String,
    perCountry:String,
    perDistrict:String,
    perThana:String,
    perPostCode:String,
    perAddressLine:String,
    currCountry:String,
    currDistrict:String,
    currThana:String,
    currPostCode:String,
    currAddressLine:String,
    studiedSchool:String,
    studiedSubject:String,
    qual1:String,
    qual2:String,
    qual3:String,
    teachedInstitute:String,
    teachedSub:String,
    teachingExperience:String,
    Department:String,
    subjectList:String,
    joiningDate:String,
    mfsNumber:String,
    mfsMedium:String,
    bankName:String,
    bankAccountName:String,
    bankAccountNum:String,
    branchName:String,
    routingName:String

})


module.exports=teacherSchema;