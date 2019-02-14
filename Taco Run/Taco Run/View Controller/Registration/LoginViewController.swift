//
//  LoginViewController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/13/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit
import FirebaseUI
import Firebase

class LoginViewController: UIViewController, AuthUIDelegate, FUIAuthDelegate {

    @IBOutlet weak var passText: UITextField!
    @IBOutlet weak var emailText: UITextField!
    
    
    var authListener: AuthStateDidChangeListenerHandle?
    
    override func viewDidLoad() {
        super.viewDidLoad()


        setupFirebaseUI()
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        setupAuthListeners()

    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        Auth.auth().removeStateDidChangeListener(authListener!)
        
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
        
        Auth.auth().signIn(withEmail: email, password: pass) { (result, error) in
            
            if let error = error {
                // TODO: alert error loggin in
                print(error.localizedDescription)
                return
            }
            
//            guard let user = result?.user else {
//                //TODO: error no user in result
//                return
//            }
            
            
        }
    }
    

    
    
    func setupAuthListeners() {
    
        authListener = Auth.auth().addStateDidChangeListener { (auth, user) in
            self.performSegue(withIdentifier: "toMain", sender: self)
        }
    }
    
    
    func setupFirebaseUI() {
        
        let authUI = FUIAuth.defaultAuthUI()
        authUI?.delegate = self
        
        
        let providers: [FUIAuthProvider] = [
            FUIGoogleAuth(),
            FUIFacebookAuth(),
            FUITwitterAuth(),
            FUIEmailAuth()
            ]
        
        authUI?.providers = providers
        
        // listen for changes in the authorization state
        authListener = Auth.auth().addStateDidChangeListener { (auth, user) in
            
            
            if user != nil {
                self.performSegue(withIdentifier: "toMain", sender: self)
                
            } else {
                // user must sign in
                self.loginSession()
            }
        }
        
        
    }
    
    func loginSession() {
        let authViewController = FUIAuth.defaultAuthUI()!.authViewController()
        self.present(authViewController, animated: true, completion: nil)
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
