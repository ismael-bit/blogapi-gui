import moment from 'moment'

var profileTemplate = `
<div class="container-fluid well span6">
	<div class="row-fluid">
        <div class="span2" >
		    <img src="Template/nouser.jpg" class="img-circle">
        </div>
        <hr>
        <div class="span8">
            <h3>{{NAME}}</h3>
            <h6>Email: <i>{{EMAIL}}</i></h6>
            <h6>Posts: <i>{{CPOSTS}}</i></h6>
            <h6>Creado en: <i>{{DATECREATE}}</i></h6>
        </div>
</div>
</div>
`


export function ProfileUser(idUser){

    blogapi.getUser(idUser)
    .then(value => {

        var t = '';
        t = profileTemplate.replace('{{DATECREATE}}',moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                                      .replace('{{EMAIL}}',value.email)
                                      .replace('{{ID}}',value.id)
                                      .replace('{{NAME}}',value.name)
                                      .replace('{{CPOSTS}}',value.posts)
                                       ;
    
        document.getElementById('app').innerHTML = t
    })
    .catch(err => console.error(err));

                                }


export default ProfileUser;