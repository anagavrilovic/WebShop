Vue.component("registration-modal", {
    data: function() {
        return {
            
        }
    },
    template: `
      <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container modal-registration">
  
                <div class="modal-header">
                  <h4 class="modal-title">Registracija</h4>
                  <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
                </div>
  
                <div class="modal-body">
                  <form>
                    <div class="form-group input-field">
                      <input type="text" class="form-control input-field" placeholder="Ime" required="required">
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Prezime" required="required">					
                    </div>

                    <div class="form-group">
                        <select class="form-select input-field" area-label="Pol">
                        <option selected disabled>Pol</option>
                            <option value="1">Muški</option>
                            <option value="2">Ženski</option>
                        </select>					
                    </div>

                    <div class="form-group">
                      <input type="date" class="form-control input-field" placeholder="Datum rođenja" required="required">					
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Korisničko ime" required="required">					
                    </div>

                    <div class="form-group">
                      <input type="password" class="form-control input-field" placeholder="Lozinka" required="required">					
                    </div>

                    <br/>
                    <div class="form-group submitButton">
                      <input type="submit" class="btn btn-secondary btn-block" value="Potvrdi" id="submitButton">
                    </div>
                    <div class="loginFromRegistrationLink">   
                      <a href="#"> Vec imate nalog? Prijavite se</a>
                    </div>
                    </form>
                </div>
  
              </div>
            </div>
          </div>
        </transition>
  `,
  methods: {

  }
  });