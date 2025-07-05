import { Component, inject, HostListener } from '@angular/core';
//import { FormBuilder, Validators } from '@angular/forms';
import { ApiAgentchatService } from '../../core/services/api-agentchat.service';

@Component({
  selector: 'app-agent-chat',
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.css',
  standalone: false
})
export class AgentChatComponent {

  AgentId: number = 0; 
  ChatMessage: string = '';
  chatRows = 10; 
  userChatRows = 3; 
  userChatMessage: string = '';

  chatHistory: any[] = [];

  constructor(private apiAgentchatService: ApiAgentchatService) {
    this.updateChatRows();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChatRows();
  }

  private updateChatRows() {
    // Adjust the number of rows based on window height
    const height = window.innerHeight;
    // Estimate: each row ~24px, card header+actions+padding ~200px
    const available = Math.max(height - 400, 100);
    this.chatRows = Math.max(3, Math.floor(available / 24));
  }

  onClickSubmitMessage(): void {
    var chatInfo = this.prepareUserChatInfo();
    this.processUserMessage(chatInfo);
  }

  prepareUserChatInfo(): any {
    const chatInfo = {
      AgentId: 0,
      messageRequest: this.userChatMessage,
      messageReply: '',
      messageHistory: this.chatHistory.join('\n\n'),
    };

    return chatInfo;
  }

  processUserMessage(chatInfo: any): void {
    this.userChatMessage = '';
    this.chatHistory.push('User >> ' + chatInfo.messageRequest);
    this.ChatMessage = this.chatHistory.join('\n\n') + 'Processing...';

    this.apiAgentchatService.ProcessMessage(chatInfo).subscribe(response => {
      this.processAgentResponse(response);
    }, error => {
      this.processErrorResponse();
    });

  }

  processAgentResponse(response: any): void {
    this.chatHistory.push('Agent>> ' + response.messageReply); 
    this.ChatMessage = this.chatHistory.join('\n\n');
  }
  processErrorResponse(): void {
    this.chatHistory.push('Error encountered!!!');
    this.ChatMessage = this.chatHistory.join('\n\n');
  }

}
