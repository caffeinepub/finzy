import Array "mo:core/Array";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Signup = {
    name : Text;
    email : Text;
    phone : Text;
    timestamp : Time.Time;
  };

  stable var signups : [Signup] = [];

  // Try to add a signup with phone number, fallback to addSignup
  public shared ({ caller }) func addSignupWithPhone(name : Text, email : Text, phone : Text) : async () {
    let signup : Signup = {
      name;
      email;
      phone;
      timestamp = Time.now();
    };
    signups := signups.concat([signup]);
  };

  // Adding signup without phone number sets phone field to empty string
  public shared ({ caller }) func addSignup(name : Text, email : Text) : async () {
    let signup : Signup = {
      name;
      email;
      phone = "";
      timestamp = Time.now();
    };
    signups := signups.concat([signup]);
  };

  public query ({ caller }) func getSignupCount() : async Nat {
    signups.size();
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signups;
  };
};
