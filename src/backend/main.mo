import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type Signup = {
    name : Text;
    email : Text;
    timestamp : Time.Time;
  };

  let signups = List.empty<Signup>();

  public shared ({ caller }) func addSignup(name : Text, email : Text) : async () {
    let signup : Signup = {
      name;
      email;
      timestamp = Time.now();
    };
    signups.add(signup);
  };

  public query ({ caller }) func getSignupCount() : async Nat {
    signups.size();
  };

  public query ({ caller }) func getSignups() : async [Signup] {
    signups.toArray();
  };
};
