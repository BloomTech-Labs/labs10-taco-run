//
//  LoginViewController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/13/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit
import FirebaseAuth
import GoogleSignIn


class LoginViewController: UIViewController, GIDSignInUIDelegate {

    
    @IBOutlet weak var passText: UITextField!
    @IBOutlet weak var emailText: UITextField!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        GIDSignIn.sharedInstance().uiDelegate = self
        GIDSignIn.sharedInstance().signIn()
        
    }
    
    @IBAction func loginTapped(_ sender: Any) {
        
        guard let email = emailText.text, !email.isEmpty else {
            // TODO: error no email
            return
        }
        
        guard let pass = passText.text, !pass.isEmpty else {
            // TODO: error no pass
            return
        }
        
        loginUser(withEmail: email, andPass: pass)

    }
    
    
    func loginUser(withEmail email: String, andPass pass: String) {
        
        Auth.auth().createUser(withEmail: email, password: pass) { (result, error) in
            
            if let error = error {
                // TODO: alert error loggin in
                print(error.localizedDescription)
                return
            }
            
            guard let user = result?.user else {
                //TODO: error no user in result
                return
            }
            
            self.performSegue(withIdentifier: "toMain", sender: self)
        }
    }
    
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
