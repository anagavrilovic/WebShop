Vue.component("login-modal", {
  template: `
	<transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container modal-login">

              <div class="modal-header">
                <h4 class="modal-title">Prijavite se</h4>
                <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
              </div>

              <div class="modal-body">
                <form method="post">
                  <div class="form-group input-field">
                    <i class="fa fa-user"></i>
                    <input type="text" class="form-control input-field" placeholder="Korisničko ime" required="required">
                  </div>
                  <div class="form-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" class="form-control input-field" placeholder="Lozinka" required="required">					
                  </div>

                  <br/><br/>
                  <div class="form-group submitButton">
                    <input type="submit" class="btn btn-secondary btn-block" value="Potvrdi" id="submitButton"
                      v-on:submit="logIn">
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </transition>
`
});